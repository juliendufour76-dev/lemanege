# Manège Maubeuge — maquette statique

Site statique (HTML/CSS/JS, sans build) construit sur le Le Manège Design System.

- `index.html` — Accueil (slider, intro, Prochainement, brochure)
- `programme.html` — Programme (filtres, liste/grille, agenda par mois, pagination)
- `assets/css/tokens/` — tokens du design system (copie)
- `assets/css/site.css` — styles des composants
- `assets/js/` — slider, menu mobile, programme

## Mise en ligne (GitHub + Vercel)

1. Téléchargez ce dossier `site/` et poussez son contenu à la racine d'un dépôt GitHub.
2. Sur vercel.com → **Add New… → Project** → importez le dépôt.
3. Framework Preset : **Other**. Build command : vide. Output directory : vide (racine).
4. **Deploy**. Chaque push sur `main` redéploie automatiquement.

`vercel.json` active les URL propres (`/programme` au lieu de `/programme.html`).

## Test en local

Ouvrez `index.html` directement, ou servez le dossier avec `npx serve .`

## Police

Neue Haas Unica Pro est incluse dans `assets/fonts/` (police commerciale : vérifiez que votre licence couvre l'usage web).
