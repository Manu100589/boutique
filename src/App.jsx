import { useEffect, useMemo, useState } from 'react';

const products = [
  { name: 'Parfum Élégance', cat: 'Parfum · 50 ml', price: 39900, rating: '★★★★★', badge: 'Nouveau', img: 'photo-1594035910387-fea47794261f' },
  { name: 'Sac Le Jardin', cat: 'Accessoires · Cuir', price: 68500, rating: '★★★★★', badge: 'Sélection', img: 'photo-1584917865442-de89df76afd3' },
  { name: 'Lunettes Solaire', cat: 'Accessoires · Édition', price: 24500, rating: '★★★★☆', badge: 'Nouveau', img: 'photo-1511499767150-a48a237f0083' },
  { name: 'Chemise N°04', cat: 'Vêtements · Lin', price: 32900, rating: '★★★★★', badge: 'Pièce choisie', img: 'photo-1598033129183-c4f50c736f10' },
  { name: 'Sneakers Studio', cat: 'Chaussures · Mixte', price: 54900, rating: '★★★★★', badge: 'Best seller', img: 'photo-1542291026-7eec264c27ff' },
  { name: 'Eau de parfum Santal', cat: 'Parfum · 75 ml', price: 49900, rating: '★★★★★', badge: 'Nouveau', img: 'photo-1592945403244-b3fbafd7f539' },
  { name: 'L’essentiel beauté', cat: 'Beauté · Soin', price: 28500, rating: '★★★★☆', badge: 'À découvrir', img: 'photo-1608248543803-ba4f8c70ae0b' },
  { name: 'Montre Héritage', cat: 'Accessoires · Acier', price: 79500, rating: '★★★★★', badge: 'Édition', img: 'photo-1523170335258-f5ed11844a49' },
];

const perfumes = [
  { name: 'Vetiver Pamplemousse', cat: 'Zara Emotions · Elixir · 100 ml', price: null, badge: 'Elixir', image: '/images/parfums/vetiver-pamplemousse.jpg' },
  { name: '#Tobacco Collection Infinite', cat: 'Zara Heritage Selection · 100 ml', price: null, badge: 'Heritage', image: '/images/parfums/tobacco-collection-infinite.jpg' },
  { name: 'Vibrant Leather', cat: 'Zara · Eau de parfum · 100 ml', price: null, badge: 'Pour lui', image: '/images/parfums/vibrant-leather.jpg' },
  { name: 'Bogoss Vibrant Leather', cat: 'Zara · Eau de parfum · 100 ml', price: null, badge: 'Pour lui', image: '/images/parfums/bogoss-vibrant-leather.jpg' },
  { name: 'For Him Solar Edition', cat: 'Zara · 100 ml', price: null, badge: 'Pour lui', image: '/images/parfums/for-him-solar-edition.jpg', notes: 'Mangue · Santal · Fève tonka' },
  { name: 'Oud Vibrant Leather', cat: 'Zara · Eau de parfum · 100 ml', price: null, badge: 'Oud', image: '/images/parfums/oud-vibrant-leather.jpg' },
  { name: 'Warm Glance', cat: 'Series: The Light · 100 ml', price: null, badge: 'The Light', image: '/images/parfums/warm-glance.jpg' },
  { name: 'Captivatingly Paris', cat: 'Zara Olfactive N°09 · 100 ml', price: null, badge: 'Olfactive', image: '/images/parfums/captivatingly-paris.jpg' },
  { name: 'Sunrise on the Red Sand Dunes', cat: 'Series: The Desert · 100 ml', price: null, badge: 'The Desert', image: '/images/parfums/sunrise-red-sand-dunes.jpg' },
  { name: 'Gracefully Madrid', cat: 'Zara Olfactive N°05 · 100 ml', price: null, badge: 'Olfactive', image: '/images/parfums/gracefully-madrid.jpg' },
  { name: 'Wood 02 Collection Opulent', cat: 'Zara Heritage Selection · 100 ml', price: null, badge: 'Heritage', image: '/images/parfums/wood-02-opulent.jpg' },
  { name: 'Night Pour Homme III', cat: 'Zara · 100 ml', price: null, badge: 'Pour lui', image: '/images/parfums/night-pour-homme-iii.jpg', notes: 'Bergamote · Poire · Iris · Cuir · Cèdre · Ambre' },
];
const shoes = [
  { name: 'Bottine rouge à talon', cat: 'Femme · Bottine', price: null, badge: 'Rouge', image: '/images/chaussures/bottine-talon-rouge.jpg' },
  { name: 'Bottine noire vernie', cat: 'Femme · Bottine', price: null, badge: 'Vernie', image: '/images/chaussures/bottine-noire-vernie.jpg' },
  { name: 'Mule noire à plumes', cat: 'Femme · Mule', price: null, badge: 'Détail plume', image: '/images/chaussures/mule-plumes-noire.jpg' },
  { name: 'Sandale jaune à brides', cat: 'Femme · Sandale', price: null, badge: 'Solaire', image: '/images/chaussures/sandale-jaune-bridee.jpg' },
  { name: 'Bottine ivoire en maille', cat: 'Femme · Bottine', price: null, badge: 'Ivoire', image: '/images/chaussures/bottine-ivoire-maille.jpg' },
  { name: 'Sandale lacée imprimée', cat: 'Femme · Sandale', price: null, badge: 'Imprimé', image: '/images/chaussures/sandale-lacee-imprime.jpg' },
  { name: 'Mocassin bicolore', cat: 'Homme · Mocassin', price: null, badge: 'Pointure 46–47', image: '/images/chaussures/mocassin-bicolore-homme.jpg', notes: 'Pointure 46–47' },
  { name: 'Bottine blanche à plateforme', cat: 'Femme · Bottine', price: null, badge: 'Plateforme', image: '/images/chaussures/bottine-blanche-plateforme.jpg' },
  { name: 'Slip-on noir à semelle blanche', cat: 'Homme · Slip-on', price: null, badge: 'Pointure 46–47', image: '/images/chaussures/slip-on-noir-homme.jpg', notes: 'Pointure 46–47' },
  { name: 'Chelsea beige', cat: 'Homme · Chelsea', price: null, badge: 'Pointure 45', image: '/images/chaussures/chelsea-beige-homme.jpg', notes: 'Pointure 45' },
  { name: 'Mocassin noir et blanc', cat: 'Homme · Mocassin', price: null, badge: 'Pointure 45', image: '/images/chaussures/mocassin-contraste-homme.jpg', notes: 'Pointure 45' },
  { name: 'Babies noires vernies', cat: 'Femme · Babies', price: null, badge: 'Pointure 40', image: '/images/chaussures/babies-noires-vernis.jpg', notes: 'Pointure 40' },
  { name: 'Bottine noire à talon aiguille', cat: 'Femme · Bottine', price: null, badge: 'Pointure 40', image: '/images/chaussures/bottine-noire-talon-aiguille.jpg', notes: 'Pointure 40' },
  { name: 'Bottine ivoire', cat: 'Femme · Bottine', price: null, badge: 'Pointure 39', image: '/images/chaussures/bottine-ivoire-pointure-39.jpg', notes: 'Pointure 39' },
  { name: 'Cuissarde bleu nuit', cat: 'Femme · Cuissarde', price: null, badge: 'Pointure 40', image: '/images/chaussures/cuissarde-bleu-nuit.jpg', notes: 'Pointure 40' },
  { name: 'Mocassin brun', cat: 'Homme · Mocassin', price: null, badge: 'Pointures 44–45', image: '/images/chaussures/mocassin-brun-homme.jpg', notes: 'Pointures 44–45' },
  { name: 'Mule noire à plume dorée', cat: 'Femme · Mule', price: null, badge: 'Pointure 39', image: '/images/chaussures/mule-plume-doree-pointure-39.jpg', notes: 'Pointure 39' },
  { name: 'Sandale lacée imprimé python', cat: 'Femme · Sandale', price: null, badge: 'Pointure 37', image: '/images/chaussures/sandale-lacee-pointure-37.jpg', notes: 'Pointure 37' },
  { name: 'Richelieu noir verni', cat: 'Homme · Richelieu', price: null, badge: 'Pointures 44–45', image: '/images/chaussures/richelieu-noir-homme.jpg', notes: 'Pointures 44–45' },
  { name: 'Bottine rouge', cat: 'Femme · Bottine', price: null, badge: 'Pointure 39', image: '/images/chaussures/bottine-rouge-pointure-39.jpg', notes: 'Pointure 39' },
  { name: 'Bottine blanche à semelle crantée', cat: 'Femme · Bottine', price: null, badge: 'Pointure 39', image: '/images/chaussures/bottine-blanche-pointure-39.jpg', notes: 'Pointure 39' },
  { name: 'Sandale nude transparente', cat: 'Femme · Sandale', price: null, badge: 'Pointures 39–40', image: '/images/chaussures/sandale-nude-transparente.jpg', notes: 'Pointures 39–40' },
  { name: 'Sandale rose à nœud', cat: 'Femme · Sandale', price: null, badge: 'Pointure 37', image: '/images/chaussures/sandale-rose-noeud.jpg', notes: 'Pointure 37' },
  { name: 'Espadrille rayée marine', cat: 'Homme · Espadrille', price: null, badge: 'Pointure 45', image: '/images/chaussures/espadrille-rayee-marine.jpg', notes: 'Pointure 45' },
  { name: 'Espadrille bleu marine', cat: 'Homme · Espadrille', price: null, badge: 'Pointure 45', image: '/images/chaussures/espadrille-bleu-marine.jpg', notes: 'Pointure 45' },
];
const allProducts = [...products, ...perfumes, ...shoes];

const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const money = (value) => value == null ? 'Prix sur demande' : `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`;
const stored = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

function ProductCard({ product, onAdd, wishlist, onWish, trend = false }) {
  const image = product.image ?? photo(product.img, 800);
  const orderMessage = `Bonjour MGE Boutique, je souhaite commander : ${product.name}${product.price == null ? '' : ` (${money(product.price)})`}. Pouvez-vous me confirmer la disponibilité ?`;
  return <article className={`product-card ${trend ? 'trend-card' : ''}`}>
    <div className="product-img">
      <img loading="lazy" src={image} alt={product.name} />
      <span className="badge">{product.badge}</span>
      <button className={`heart ${wishlist.includes(product.name) ? 'active' : ''}`} aria-label="Ajouter aux favoris" onClick={() => onWish(product.name)}>
        {wishlist.includes(product.name) ? '♥' : '♡'}
      </button>
    </div>
    <div className="product-info">{product.rating && <div className="rating">{product.rating}</div>}<h3>{product.name}</h3>
      <div className="product-meta"><span>{product.cat}</span><strong>{money(product.price)}</strong></div>
      {product.notes && <div className="perfume-notes">{product.notes}</div>}
    </div>
    <a className="whatsapp-cta" href={`https://wa.me/?text=${encodeURIComponent(orderMessage)}`} target="_blank" rel="noopener noreferrer">Commandez sur WhatsApp&nbsp; ↗</a>
  </article>;
}

function App() {
  const [cart, setCart] = useState(() => stored('aubeCart', []));
  const [wishlist, setWishlist] = useState(() => stored('aubeWish', []));
  const [drawer, setDrawer] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [shoeFilter, setShoeFilter] = useState('Tous');

  useEffect(() => { localStorage.setItem('aubeCart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('aubeWish', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        document.documentElement.style.setProperty('--hero-shift', `${Math.min(window.scrollY, 520) * -0.12}px`);
        frame = 0;
      });
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    const targets = document.querySelectorAll('.reveal, .product-card, .split-panel, .quote, .social, .newsletter');
    const splitSections = document.querySelectorAll('.split-scroll');
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.target.classList.contains('split-scroll')) {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      } else if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -10% 0px' });
    targets.forEach((el, index) => {
      el.classList.add('scroll-reveal');
      el.style.setProperty('--motion-delay', `${(index % 5) * 75}ms`);
      observer.observe(el);
    });
    splitSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (allProducts.find((p) => p.name === item.name)?.price ?? 0) * item.qty, 0);
  const searchResults = useMemo(() => allProducts.filter((p) => `${p.name} ${p.cat}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const visibleShoes = shoeFilter === 'Tous' ? shoes : shoes.filter((product) => product.cat.startsWith(`${shoeFilter} ·`));
  const addToCart = (name) => setCart((current) => current.some((item) => item.name === name)
    ? current.map((item) => item.name === name ? { ...item, qty: item.qty + 1 } : item)
    : [...current, { name, qty: 1 }]);
  const toggleWishlist = (name) => setWishlist((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const closePanels = () => { setDrawer(null); setSearchOpen(false); };

  const cardProps = { onAdd: (name) => { addToCart(name); setDrawer('cart'); }, wishlist, onWish: toggleWishlist };

  return <>
    <div className="announcement">Livraison offerte dès 75 000 FCFA <span style={{ margin: '0 12px' }}>·</span> Une attention pour vous, partout au Cameroun</div>
    <header className={`header ${scrolled || menuOpen ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`} onMouseLeave={() => setMenuOpen(false)}>
      <a className="logo" href="#accueil" aria-label="MGE Boutique — accueil"><img src="/images/mge-boutique-logo.png" alt="MGE Boutique — Mode, beauté, accessoires" /></a>
      <nav className="nav">
        <a href="#nouveautes">Nouveautés</a>
        {['Vêtements', 'Chaussures', 'Accessoires', 'Parfums', 'Beauté'].map((item) => <div className="nav-item" key={item} onMouseEnter={() => setMenuOpen(true)}><button>{item}</button></div>)}
      </nav>
      <div className="tools">
        <button className="icon-btn search-text" aria-label="Rechercher" onClick={() => setSearchOpen(true)}>⌕</button>
        <button className="icon-btn account" aria-label="Compte">♙</button>
        <button className="icon-btn" aria-label="Favoris" onClick={() => setDrawer('wishlist')}>♡</button>
        <button className="icon-btn" aria-label="Panier" onClick={() => setDrawer('cart')}>♧<span className="count">{cartCount}</span></button>
      </div>
      <div className="menu-panel">
        <div className="menu-col"><h4>COLLECTION</h4><a href="#nouveautes">Nouveautés</a><a href="#categories">Toute la sélection</a></div>
        <div className="menu-col"><h4>POUR LUI</h4><a href="#lui-elle">Vêtements</a><a href="#collection-chaussures">Chaussures</a><a href="#lui-elle">Accessoires</a></div>
        <div className="menu-col"><h4>POUR ELLE</h4><a href="#lui-elle">Vêtements</a><a href="#collection-chaussures">Chaussures</a><a href="#lui-elle">Beauté</a><a href="#collection-parfums">Parfums</a></div>
        <div className="menu-photo"><span>Les essentiels de saison ↗</span></div>
      </div>
    </header>

    <main>
      <section className="hero" id="accueil"><div className="hero-content"><div className="eyebrow">La sélection qui vous ressemble</div><h1>VOTRE STYLE.<br />VOTRE SIGNATURE.</h1><p>Mode, parfums, chaussures, accessoires et beauté sélectionnés pour révéler votre personnalité.</p><div className="actions"><a className="button" href="#categories">Découvrir la collection <span>↗</span></a><a className="button light" href="#nouveautes">Voir les nouveautés</a></div></div><div className="scroll-note">DÉFILER POUR EXPLORER ↓</div><div className="hero-index">01 — 04</div></section>

      <section className="section split-scroll" id="categories"><div className="section-head reveal"><div><div className="kicker">Votre prochain coup de cœur</div><h2>Explorez votre style</h2></div><a className="text-link" href="#nouveautes">Voir toute la sélection ↗</a></div>
        <div className="categories">
          {[
            ['Vêtements', 'Les essentiels du vestiaire', 'Des pièces qui vous vont, vraiment.', '/images/chaussures/bottine-talon-rouge.jpg'],
            ['Chaussures', 'Pas après pas', 'La bonne allure commence ici.', '/images/chaussures/bottine-blanche-plateforme.jpg'],
            ['Accessoires', 'Le détail juste', 'Tout est dans la nuance.', 'photo-1523170335258-f5ed11844a49'],
            ['Parfums', 'Une empreinte subtile', 'Votre présence, en quelques notes.', 'photo-1594035910387-fea47794261f'],
            ['Beauté', 'Le rituel du quotidien', 'Prendre soin de soi, avec plaisir.', 'photo-1608248543803-ba4f8c70ae0b'],
          ].map(([title, eyebrow, text, img]) => <a className="category reveal" href={title === 'Parfums' ? '#collection-parfums' : title === 'Chaussures' ? '#collection-chaussures' : '#nouveautes'} key={title}><img loading="lazy" src={img.startsWith('/') ? img : photo(img, 1100)} alt={title} /><div className="cat-copy"><small>{eyebrow}</small><h3>{title}</h3><p>{text}</p></div><span className="cat-arrow">↗</span></a>)}
        </div>
      </section>

      <section className="split" id="lui-elle">
        <a className="split-panel" href="#nouveautes"><img src="/images/chaussures/mocassin-brun-homme.jpg" alt="Modèle noir portant la sélection masculine" /><div className="split-copy"><small className="eyebrow">La sélection masculine</small><h2>Pour lui</h2><div><span>Vêtements</span><span>Chaussures</span><span>Accessoires</span><span>Parfums</span></div></div></a>
        <a className="split-panel" href="#nouveautes"><img src="/images/chaussures/sandale-jaune-bridee.jpg" alt="Modèle noire portant la sélection féminine" /><div className="split-copy"><small className="eyebrow">La sélection féminine</small><h2>Pour elle</h2><div><span>Vêtements</span><span>Chaussures</span><span>Accessoires</span><span>Beauté</span></div></div></a>
      </section>

      <section className="section split-scroll" id="nouveautes"><div className="section-head reveal"><div><div className="kicker">Tout juste arrivés</div><h2>Les nouveautés</h2></div><a className="text-link" href="#tendances">Découvrir la collection ↗</a></div><div className="products">{products.slice(0, 4).map((product) => <ProductCard key={product.name} product={product} {...cardProps} />)}</div></section>

      <section className="trending" id="tendances"><div className="section-head reveal"><div><div className="kicker">Repérés pour vous</div><h2>Tendances du moment</h2></div><div style={{ font: '12px var(--serif)', color: 'var(--muted)' }}>Faites défiler&nbsp; →</div></div><div className="trend-row">{[...products.slice(4), ...products.slice(0, 4)].map((product) => <ProductCard key={`trend-${product.name}`} product={product} trend {...cardProps} />)}</div></section>

      <section className="fragrance" id="parfums"><div className="fragrance-copy reveal"><div className="kicker" style={{ color: '#a8d0b5' }}>L’art du parfum</div><h2>Une signature qui vous ressemble.</h2><p>Des sillages singuliers, choisis pour vous accompagner du premier rendez-vous aux jours ordinaires.</p><div className="notes"><div><b>Notes de tête</b>Bergamote · Poivre rose</div><div><b>Notes de cœur</b>Jasmin · Iris</div><div><b>Notes de fond</b>Bois ambré · Musc</div></div><a className="button light" href="#collection-parfums">Découvrir les parfums ↗</a></div><div className="bottle"><img src="/images/parfums/night-pour-homme-iii.jpg" alt="Night Pour Homme III, flacon de parfum ambré" /></div></section>

      <section className="section perfume-catalogue split-scroll" id="collection-parfums"><div className="section-head reveal"><div><div className="kicker">La collection parfumée</div><h2>Nos parfums</h2></div><div className="kicker">12 fragrances · 100 ml</div></div><div className="products">{perfumes.map((product) => <ProductCard key={product.name} product={product} {...cardProps} />)}</div></section>

      <section className="shoe-section" id="chaussures"><div className="shoe-layout"><div className="shoe-image reveal"><img src="/images/chaussures/mocassin-brun-homme.jpg" alt="Mocassins bruns de la collection MGE Boutique" /></div><div className="shoe-copy reveal"><div className="kicker">En mouvement</div><h2>Step into<br />your style.</h2><p>Des silhouettes qui donnent le ton. Des lignes affirmées, un confort pensé pour suivre votre rythme.</p><a className="text-link" href="#collection-chaussures">Explorer les chaussures ↗</a></div></div></section>

      <section className="section shoe-catalogue split-scroll" id="collection-chaussures"><div className="section-head reveal"><div><div className="kicker">La collection chaussures</div><h2>À chaque pas, son allure</h2></div><div className="kicker">{visibleShoes.length} modèles · tailles indiquées sur les visuels</div></div><div className="collection-filters" role="group" aria-label="Filtrer les chaussures par genre">{['Tous', 'Femme', 'Homme'].map((filter) => <button key={filter} type="button" className={shoeFilter === filter ? 'active' : ''} aria-pressed={shoeFilter === filter} onClick={() => setShoeFilter(filter)}>{filter}</button>)}</div><div className="products">{visibleShoes.map((product) => <ProductCard key={product.name} product={product} {...cardProps} />)}</div></section>

      <section className="testimonials split-scroll"><div className="kicker">Le style au quotidien</div><div className="rating">★★★★★</div><div className="quote">« La sélection est superbe, et mon parfum est arrivé si joliment présenté. Je reviendrai sans hésiter. »</div><div className="quote-author">Aminata · Cliente · Parfum Élégance</div></section>
      <section className="section social-section split-scroll" id="social"><div className="section-head"><div><div className="kicker">Vos inspirations, vos instants</div><h2>Inspirez-vous</h2></div><a className="text-link" href="#newsletter">Nous suivre ↗</a></div><div className="social-grid">{['bottine-talon-rouge','mocassin-brun-homme','sandale-jaune-bridee','cuissarde-bleu-nuit','espadrille-bleu-marine'].map((img) => <a className="social" href="#newsletter" key={img}><img loading="lazy" src={`/images/chaussures/${img}.jpg`} alt="Modèle noir et sélection mode MGE Boutique" /></a>)}</div></section>

      <section className="newsletter split-scroll" id="newsletter"><div className="kicker">Une lettre, de belles découvertes</div><h2>Entrez dans le cercle.</h2><p>Recevez nos nouveautés, collections et offres exclusives.</p><form className="signup" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); setEmail(''); }}><input type="email" required placeholder="Votre adresse email" aria-label="Votre adresse email" value={email} onChange={(event) => setEmail(event.target.value)} /><button>Je m’inscris&nbsp; ↗</button></form><div className="signup-message">{subscribed ? 'Merci, vous êtes dans le cercle.' : ''}</div></section>
    </main>

    <footer className="footer"><div className="footer-top"><div className="footer-brand"><div className="footer-logo"><img src="/images/mge-boutique-logo.png" alt="MGE Boutique — Mode, beauté, accessoires" /></div><p>Une sélection de mode, beauté et lifestyle pour celles et ceux qui aiment choisir leur allure.</p></div><div><h4>COLLECTIONS</h4><a href="#categories">Vêtements</a><a href="#collection-chaussures">Chaussures</a><a href="#categories">Accessoires</a><a href="#collection-parfums">Parfums</a><a href="#categories">Beauté</a></div><div><h4>SERVICE CLIENT</h4><a href="mailto:">Contact</a><a href="#newsletter">Livraison</a><a href="#newsletter">Retours</a><a href="#newsletter">FAQ</a><a href="#newsletter">Conditions de vente</a></div><div><h4>À PROPOS</h4><a href="#accueil">Notre histoire</a><a href="#accueil">Nos valeurs</a><h4 className="social-title">SUIVEZ-NOUS</h4><a href="#social">Instagram&nbsp; · &nbsp;Facebook</a><a href="#social">TikTok&nbsp; · &nbsp;WhatsApp</a></div></div><div className="foot-bottom"><span>© 2026 MGE Boutique · Cameroun</span><span>Une sélection faite avec intention.</span><span>FR&nbsp; / &nbsp;FCFA</span></div></footer>

    <nav className="mobile-nav"><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><i>⌂</i>Accueil</button><button onClick={() => document.querySelector('#categories').scrollIntoView({ behavior: 'smooth' })}><i>▤</i>Catégories</button><button onClick={() => setSearchOpen(true)}><i>⌕</i>Recherche</button><button onClick={() => setDrawer('wishlist')}><i>♡</i>Favoris</button><button onClick={() => setDrawer('cart')}><i>♧</i>Panier</button></nav>

    {(drawer || searchOpen) && <div className="overlay show" onClick={closePanels} />}
    <aside className={`drawer ${drawer ? 'show' : ''}`} aria-hidden={!drawer}>
      <div className="drawer-head"><h2>{drawer === 'wishlist' ? 'Ma liste' : 'Votre panier'}</h2><button className="close" onClick={closePanels} aria-label="Fermer">×</button></div>
      <div className="cart-list">{(drawer === 'wishlist' ? wishlist.map((name) => ({ ...allProducts.find((p) => p.name === name), qty: 0 })) : cart.map((item) => ({ ...allProducts.find((p) => p.name === item.name), qty: item.qty }))).length ? (drawer === 'wishlist' ? wishlist.map((name) => ({ ...allProducts.find((p) => p.name === name), qty: 0 })) : cart.map((item) => ({ ...allProducts.find((p) => p.name === item.name), qty: item.qty }))).map((item) => <div className="cart-item" key={item.name}><img src={item.image ?? photo(item.img, 200)} alt="" /><div><h4>{item.name}</h4><small>{item.cat}</small><p>{money(item.price)}{item.qty ? ` · Qté ${item.qty}` : ''}</p></div><button className="remove" onClick={() => drawer === 'wishlist' ? toggleWishlist(item.name) : setCart((current) => current.filter((x) => x.name !== item.name))}>Retirer</button></div>) : <div className="empty">{drawer === 'wishlist' ? 'Votre liste est encore vide.' : 'Votre panier attend son premier coup de cœur.'}</div>}</div>
      <div className="cart-total">{drawer === 'cart' && cart.length > 0 && <><div><span>Sous-total</span><strong>{money(subtotal)}</strong></div><div><span>Livraison</span><span>Calculée à l’étape suivante</span></div><a className="button" href="mailto:?subject=Ma%20commande">Passer la commande&nbsp; ↗</a></>}</div>
    </aside>
    <div className={`searchbox ${searchOpen ? 'show' : ''}`}><div className="search-line"><span>⌕</span><input placeholder="Que recherchez-vous ?" value={query} onChange={(event) => setQuery(event.target.value)} autoFocus={searchOpen} /><button className="close" onClick={closePanels} aria-label="Fermer la recherche">×</button></div><div className="search-results">{query ? searchResults.length ? searchResults.slice(0, 5).map((item) => <a className="search-result" href={item.cat.startsWith('Homme ·') || item.cat.startsWith('Femme ·') ? '#collection-chaussures' : item.image ? '#collection-parfums' : '#nouveautes'} key={item.name} onClick={closePanels}><img src={item.image ?? photo(item.img, 220)} alt="" /><span><strong>{item.name}</strong><small>{item.cat}</small></span><b>{money(item.price)}</b></a>) : 'Aucun résultat pour le moment.' : 'Rechercher dans la boutique · Vêtements · Parfums · Nouveautés'}</div></div>
  </>;
}

export default App;


