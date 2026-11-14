const SECRET = import.meta.env.VITE_BADGE_SECRET || "GEDREPACAM_DEFAULT_SECRET";

export function genererSignatureBadge({ transId, noms, prenoms, telephone }) {
  const payload = `${SECRET}|${transId}|${noms.trim().toUpperCase()}|${prenoms.trim().toUpperCase()}|${telephone.replace(/\s+/g, '')}`;

  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < payload.length; i++) {
    const ch = payload.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).toUpperCase();
}

export function construireUrlVerification({ transId, donnees }) {
  const sig = genererSignatureBadge({
    transId,
    noms: donnees.noms,
    prenoms: donnees.prenoms,
    telephone: donnees.telephone
  });

  const params = new URLSearchParams({
    id: transId,
    nom: donnees.noms,
    prenom: donnees.prenoms,
    tel: donnees.telephone,
    prof: donnees.profession || '',
    inst: donnees.institution || '',
    sig
  });

  return `${window.location.origin}/verifier?${params.toString()}`;
}

export function construireUrlBadge({ transId, donnees }) {
  const sig = genererSignatureBadge({
    transId,
    noms: donnees.noms,
    prenoms: donnees.prenoms,
    telephone: donnees.telephone
  });

  const params = new URLSearchParams({
    id: transId,
    titre: donnees.titre || '',
    nom: donnees.noms,
    prenom: donnees.prenoms,
    tel: donnees.telephone,
    statut: donnees.statut || 'Participant',
    prof: donnees.profession || '',
    inst: donnees.institution || '',
    sig
  });

  return `${window.location.origin}/mon-badge?${params.toString()}`;
}