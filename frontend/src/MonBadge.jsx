import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import BadgeConference from './BadgeConference';
import { genererSignatureBadge } from './utils/badgeUtils';

function MonBadge() {
  const [searchParams] = useSearchParams();

  const transId = searchParams.get('id') || '';
  const titre = searchParams.get('titre') || '';
  const noms = searchParams.get('nom') || '';
  const prenoms = searchParams.get('prenom') || '';
  const telephone = searchParams.get('tel') || '';
  const statut = searchParams.get('statut') || 'Participant';
  const profession = searchParams.get('prof') || '';
  const institution = searchParams.get('inst') || '';
  const signatureRecue = searchParams.get('sig') || '';

  const signatureAttendue =
    transId && noms && prenoms && telephone
      ? genererSignatureBadge({ transId, noms, prenoms, telephone })
      : '';

  const estValide = Boolean(signatureRecue && signatureRecue === signatureAttendue);

  if (!estValide) {
    return (
      <main className="pt-32 pb-16 px-4 max-w-md mx-auto font-sans">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden text-center">
          <div className="bg-[#c11236] text-white p-6">
            <XCircle size={48} className="mx-auto mb-2" />
            <h1 className="text-xl font-extrabold">Lien de badge invalide</h1>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-sm text-gray-600">
              Ce lien est incomplet ou a été modifié. Utilisez le bouton présent dans votre e-mail de confirmation.
            </p>
            <Link to="/" className="inline-block text-sm font-bold text-[#c11236] underline">
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16 px-4 max-w-lg mx-auto font-sans">
      <BadgeConference
        donnees={{ titre, noms, prenoms, telephone, statut, profession, institution }}
        transId={transId}
      />
    </main>
  );
}

export default MonBadge;