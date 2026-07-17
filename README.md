# Steven Bouchard Lavoie - Site iA + Landing Meta

Site statique français pour Steven Bouchard Lavoie, conseiller en sécurité financière (iA Groupe financier, Agence Dolbeau 043).

- **Repo :** [alexandreroy-dev/stevenia](https://github.com/alexandreroy-dev/stevenia)
- **Hébergement :** GitHub Pages (`main` / root)
- **URL provisoire :** `https://alexandreroy-dev.github.io/stevenia/`
- **Landing Meta Ads :** `landing.html`

## Pages

| Fichier | Rôle |
|---------|------|
| `index.html` | Accueil site |
| `landing.html` | Landing conversion Meta (sections longues) |
| `services.html` | MRA, Le Coffre, CDC, épargne |
| `contact.html` | Formulaire Salesforce (`lead_source=Website`) |
| `merci.html` | Confirmation + événement Lead Meta Pixel |
| `politique-confidentialite.html` | Loi 25 |

## Activer GitHub Pages

1. Repo → **Settings → Pages**
2. Source : **Deploy from a branch**
3. Branch : `main` / folder : `/ (root)`
4. Attendre la publication ; vérifier `.nojekyll` est présent (déjà dans le repo)

### Domaine personnalisé

Quand le client fournit le domaine :

1. Créer un fichier `CNAME` à la racine contenant uniquement le domaine (ex. `www.exemple.ca`)
2. Configurer le DNS chez le registraire (enregistrements A/AAAA ou CNAME selon la doc GitHub Pages)
3. Mettre à jour **`SITE_ORIGIN`** partout (voir ci-dessous)

## Configuration requise (`REPLACE_ME`)

### `SITE_ORIGIN`

Valeur actuelle : `https://alexandreroy-dev.github.io/stevenia`

À mettre à jour dans :

- `retURL` des formulaires (`contact.html`, `landing.html`)
- balises `canonical` / Open Graph
- `robots.txt` et `sitemap.xml`
- JSON-LD dans `index.html` / `landing.html`

### Salesforce Web-to-Lead

Endpoint : `https://webto.salesforce.com/servlet/WebToLead?encoding=UTF-8`

| Champ | Statut |
|-------|--------|
| `oid` | Remplacer `REPLACE_ME_SALESFORCE_OID` |
| `00NREPLACE_TYPE` | Remplacer par l’API name du picklist « Type de demande » |
| Champs UTM | Noms standards ou custom - aligner avec Apollo/SF |
| `lead_source` | `Website` (contact) / `Meta Ads` (landing) |

Tant que `oid` commence par `REPLACE_ME`, le JS bloque l’envoi et affiche un message (évite un POST invalide).

### Meta Pixel

Dans `js/modules/analytics.js` : remplacer `REPLACE_ME_META_PIXEL_ID`.  
`merci.html` déclenche `fbq('track', 'Lead')` via `data-page="merci"`.

### Assets marque

Remplacer les placeholders dans `assets/images/` :

- `logo-ia.svg` → logo officiel Vitrine Web
- `steven-headshot.svg` → photo pro (WebP recommandé)
- `hero-bg.svg` / `og-social.svg` → visuels finaux

## Stack

- HTML5 sémantique, CSS custom (`css/tokens.css`, `css/styles.css`)
- JS ESM : nav, scroll-reveal, formulaire, analytics
- Polices : Instrument Sans + DM Sans
- Couleurs : navy iA `#003366`, accent or `#C5A059`

## Développement local

Ouvrir avec un serveur statique (les modules ES nécessitent http) :

```bash
npx --yes serve -l 5173 .
# puis http://localhost:5173
```

## Conformité iA (rappel)

- Nom du conseiller + cabinet visible
- Logo iA non utilisé comme identité principale / avatar
- Mentions légales en pied de page
- Lien AMF
- Pas de langage de rendements garantis
