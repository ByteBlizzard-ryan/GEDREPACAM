/**
 * Compression des photos dans le navigateur, avant l'envoi.
 *
 * - Réduit l'image pour que son plus grand côté ne dépasse pas MAX_DIMENSION
 *   pixels (largement suffisant pour lire une carte ou une attestation).
 * - L'enregistre en JPEG qualité QUALITY (les zones transparentes des PNG
 *   deviennent blanches).
 * - Si le résultat n'est pas plus léger que l'original, l'original est gardé.
 * - Les PDF et autres fichiers ne sont pas modifiés.
 */
const MAX_DIMENSION = 2000; // pixels
const QUALITY = 0.8; // 0 à 1

const IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

function chargerImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Image illisible'));
    };
    img.src = url;
  });
}

/**
 * @param {File} file
 * @returns {Promise<{ file: File, compressed: boolean, originalSize: number }>}
 */
export async function compresserImage(file) {
  const originalSize = file.size;
  if (!IMAGE_TYPES.includes(file.type)) {
    return { file, compressed: false, originalSize };
  }

  try {
    const img = await chargerImage(file);
    const ratio = Math.min(1, MAX_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
    const largeur = Math.max(1, Math.round(img.naturalWidth * ratio));
    const hauteur = Math.max(1, Math.round(img.naturalHeight * ratio));

    const canvas = document.createElement('canvas');
    canvas.width = largeur;
    canvas.height = hauteur;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, largeur, hauteur);
    ctx.drawImage(img, 0, 0, largeur, hauteur);

    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', QUALITY));
    if (!blob || blob.size >= originalSize) {
      return { file, compressed: false, originalSize };
    }

    const nom = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return {
      file: new File([blob], nom, { type: 'image/jpeg', lastModified: Date.now() }),
      compressed: true,
      originalSize
    };
  } catch {
    // En cas de souci (format exotique, navigateur ancien), on envoie l'original
    return { file, compressed: false, originalSize };
  }
}
