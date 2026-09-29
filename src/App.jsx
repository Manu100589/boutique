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

const photo = (id, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
const money = (value) => `${new Intl.NumberFormat('fr-FR').format(value)} FCFA`;
const stored = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
};

function ProductCard({ product, onAdd, wishlist, onWish, trend = false }) {
  return <article className={`product-card ${trend ? 'trend-card' : ''}`}>
    <div className="product-img">
      <img loading="lazy" src={photo(product.img, 800)} alt={product.name} />
      <span className="badge">{product.badge}</span>
      <button className={`heart ${wishlist.includes(product.name) ? 'active' : ''}`} aria-label="Ajouter aux favoris" onClick={() => onWish(product.name)}>
        {wishlist.includes(product.name) ? '♥' : '♡'}
      </button>
      <button className="quick-add" onClick={() => onAdd(product.name)}>＋ Ajouter au panier</button>
    </div>
    <div className="product-info"><div className="rating">{product.rating}</div><h3>{product.name}</h3>
      <div className="product-meta"><span>{product.cat}</span><strong>{money(product.price)}</strong></div>
    </div>
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

  useEffect(() => { localStorage.setItem('aubeCart', JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem('aubeWish', JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.13 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + products.find((p) => p.name === item.name).price * item.qty, 0);
  const searchResults = useMemo(() => products.filter((p) => `${p.name} ${p.cat}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const addToCart = (name) => setCart((current) => current.some((item) => item.name === name)
    ? current.map((item) => item.name === name ? { ...item, qty: item.qty + 1 } : item)
    : [...current, { name, qty: 1 }]);
  const toggleWishlist = (name) => setWishlist((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const closePanels = () => { setDrawer(null); setSearchOpen(false); };

  const cardProps = { onAdd: (name) => { addToCart(name); setDrawer('cart'); }, wishlist, onWish: toggleWishlist };

  return <>
    <div className="announcement">Livraison offerte dès 75 000 FCFA <span style={{ margin: '0 12px' }}>·</span> Une attention pour vous, partout en Côte d’Ivoire</div>
    <header className={`header ${scrolled || menuOpen ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`} onMouseLeave={() => setMenuOpen(false)}>
      <a className="logo" href="#accueil">maison aube<span>STYLE · BEAUTÉ · LIFESTYLE</span></a>
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
        <div className="menu-col"><h4>POUR LUI</h4><a href="#lui-elle">Vêtements</a><a href="#lui-elle">Chaussures</a><a href="#lui-elle">Accessoires</a></div>
        <div className="menu-col"><h4>POUR ELLE</h4><a href="#lui-elle">Vêtements</a><a href="#lui-elle">Beauté</a><a href="#lui-elle">Parfums</a></div>
        <div className="menu-photo"><span>Les essentiels de saison ↗</span></div>
      </div>
    </header>

    <main>
      <section className="hero" id="accueil"><div className="hero-content"><div className="eyebrow">La sélection qui vous ressemble</div><h1>VOTRE STYLE.<br />VOTRE SIGNATURE.</h1><p>Mode, parfums, chaussures, accessoires et beauté sélectionnés pour révéler votre personnalité.</p><div className="actions"><a className="button" href="#categories">Découvrir la collection <span>↗</span></a><a className="button light" href="#nouveautes">Voir les nouveautés</a></div></div><div className="scroll-note">DÉFILER POUR EXPLORER ↓</div><div className="hero-index">01 — 04</div></section>

      <section className="section" id="categories"><div className="section-head reveal"><div><div className="kicker">Votre prochain coup de cœur</div><h2>Explorez votre style</h2></div><a className="text-link" href="#nouveautes">Voir toute la sélection ↗</a></div>
        <div className="categories">
          {[
            ['Vêtements', 'Les essentiels du vestiaire', 'Des pièces qui vous vont, vraiment.', 'photo-1483985988355-763728e1935b'],
            ['Chaussures', 'Pas après pas', 'La bonne allure commence ici.', 'photo-1543163521-1bf539c55dd2'],
            ['Accessoires', 'Le détail juste', 'Tout est dans la nuance.', 'photo-1523170335258-f5ed11844a49'],
            ['Parfums', 'Une empreinte subtile', 'Votre présence, en quelques notes.', 'photo-1594035910387-fea47794261f'],
            ['Beauté', 'Le rituel du quotidien', 'Prendre soin de soi, avec plaisir.', 'photo-1608248543803-ba4f8c70ae0b'],
          ].map(([title, eyebrow, text, img]) => <a className="category reveal" href={title === 'Parfums' ? '#parfums' : '#nouveautes'} key={title}><img loading="lazy" src={photo(img, 1100)} alt={title} /><div className="cat-copy"><small>{eyebrow}</small><h3>{title}</h3><p>{text}</p></div><span className="cat-arrow">↗</span></a>)}
        </div>
      </section>

      <section className="split" id="lui-elle">
        <a className="split-panel" href="#nouveautes"><img src={photo('photo-1519085360753-af0119f7cbe7', 1400)} alt="Sélection pour lui" /><div className="split-copy"><small className="eyebrow">La sélection masculine</small><h2>Pour lui</h2><div><span>Vêtements</span><span>Chaussures</span><span>Accessoires</span><span>Parfums</span></div></div></a>
        <a className="split-panel" href="#nouveautes"><img src={photo('photo-1534528741775-53994a69daeb', 1400)} alt="Sélection pour elle" /><div className="split-copy"><small className="eyebrow">La sélection féminine</small><h2>Pour elle</h2><div><span>Vêtements</span><span>Chaussures</span><span>Accessoires</span><span>Beauté</span></div></div></a>
      </section>

      <section className="section" id="nouveautes"><div className="section-head reveal"><div><div className="kicker">Tout juste arrivés</div><h2>Les nouveautés</h2></div><a className="text-link" href="#tendances">Découvrir la collection ↗</a></div><div className="products">{products.slice(0, 4).map((product) => <ProductCard key={product.name} product={product} {...cardProps} />)}</div></section>

      <section className="trending" id="tendances"><div className="section-head reveal"><div><div className="kicker">Repérés pour vous</div><h2>Tendances du moment</h2></div><div style={{ font: '12px var(--serif)', color: 'var(--muted)' }}>Faites défiler&nbsp; →</div></div><div className="trend-row">{[...products.slice(4), ...products.slice(0, 4)].map((product) => <ProductCard key={`trend-${product.name}`} product={product} trend {...cardProps} />)}</div></section>

      <section className="fragrance" id="parfums"><div className="fragrance-copy reveal"><div className="kicker" style={{ color: '#bdb39f' }}>L’art du parfum</div><h2>Une signature qui vous ressemble.</h2><p>Des sillages singuliers, choisis pour vous accompagner du premier rendez-vous aux jours ordinaires.</p><div className="notes"><div><b>Notes de tête</b>Bergamote · Poivre rose</div><div><b>Notes de cœur</b>Jasmin · Iris</div><div><b>Notes de fond</b>Bois ambré · Musc</div></div><a className="button light" href="#nouveautes">Découvrir les parfums ↗</a></div><div className="bottle"><img src={photo('photo-1592945403244-b3fbafd7f539', 850)} alt="Flacon de parfum sculptural" /></div></section>

      <section className="shoe-section" id="chaussures"><div className="shoe-layout"><div className="shoe-image reveal"><img src={photo('photo-1542291026-7eec264c27ff', 1200)} alt="Sneakers rouge sur fond studio" /></div><div className="shoe-copy reveal"><div className="kicker">En mouvement</div><h2>Step into<br />your style.</h2><p>Des silhouettes qui donnent le ton. Des lignes affirmées, un confort pensé pour suivre votre rythme.</p><a className="text-link" href="#nouveautes">Trouver votre paire ↗</a></div></div></section>

      <section className="testimonials"><div className="kicker">Le style au quotidien</div><div className="rating">★★★★★</div><div className="quote">« La sélection est superbe, et mon parfum est arrivé si joliment présenté. Je reviendrai sans hésiter. »</div><div className="quote-author">Aminata · Abidjan · Parfum Élégance</div></section>
      <section className="section social-section" id="social"><div className="section-head"><div><div className="kicker">Vos inspirations, vos instants</div><h2>Inspirez-vous</h2></div><a className="text-link" href="#newsletter">Nous suivre ↗</a></div><div className="social-grid">{['photo-1539109136881-3be0616acf4b','photo-1529139574466-a303027c1d8b','photo-1483985988355-763728e1935b','photo-1515886657613-9f3515b0c78f','photo-1525507119028-ed4c629a60a3'].map((img) => <a className="social" href="#newsletter" key={img}><img loading="lazy" src={photo(img, 600)} alt="Inspiration Maison Aube" /></a>)}</div></section>

      <section className="newsletter" id="newsletter"><div className="kicker">Une lettre, de belles découvertes</div><h2>Entrez dans le cercle.</h2><p>Recevez nos nouveautés, collections et offres exclusives.</p><form className="signup" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); setEmail(''); }}><input type="email" required placeholder="Votre adresse email" aria-label="Votre adresse email" value={email} onChange={(event) => setEmail(event.target.value)} /><button>Je m’inscris&nbsp; ↗</button></form><div className="signup-message">{subscribed ? 'Merci, vous êtes dans le cercle.' : ''}</div></section>
    </main>

    <footer className="footer"><div className="footer-top"><div className="footer-brand"><div className="footer-logo">maison aube</div><p>Une sélection de mode, beauté et lifestyle pour celles et ceux qui aiment choisir leur allure.</p></div><div><h4>COLLECTIONS</h4><a href="#categories">Vêtements</a><a href="#chaussures">Chaussures</a><a href="#categories">Accessoires</a><a href="#parfums">Parfums</a><a href="#categories">Beauté</a></div><div><h4>SERVICE CLIENT</h4><a href="mailto:bonjour@maisonaube.ci">Contact</a><a href="#newsletter">Livraison</a><a href="#newsletter">Retours</a><a href="#newsletter">FAQ</a><a href="#newsletter">Conditions de vente</a></div><div><h4>À PROPOS</h4><a href="#accueil">Notre histoire</a><a href="#accueil">Nos valeurs</a><h4 className="social-title">SUIVEZ-NOUS</h4><a href="#social">Instagram&nbsp; · &nbsp;Facebook</a><a href="#social">TikTok&nbsp; · &nbsp;WhatsApp</a></div></div><div className="foot-bottom"><span>© 2025 Maison Aube · Abidjan, Côte d’Ivoire</span><span>Une sélection faite avec intention.</span><span>FR&nbsp; / &nbsp;FCFA</span></div></footer>

    <nav className="mobile-nav"><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><i>⌂</i>Accueil</button><button onClick={() => document.querySelector('#categories').scrollIntoView({ behavior: 'smooth' })}><i>▤</i>Catégories</button><button onClick={() => setSearchOpen(true)}><i>⌕</i>Recherche</button><button onClick={() => setDrawer('wishlist')}><i>♡</i>Favoris</button><button onClick={() => setDrawer('cart')}><i>♧</i>Panier</button></nav>

    {(drawer || searchOpen) && <div className="overlay show" onClick={closePanels} />}
    <aside className={`drawer ${drawer ? 'show' : ''}`} aria-hidden={!drawer}>
      <div className="drawer-head"><h2>{drawer === 'wishlist' ? 'Ma liste' : 'Votre panier'}</h2><button className="close" onClick={closePanels} aria-label="Fermer">×</button></div>
      <div className="cart-list">{(drawer === 'wishlist' ? wishlist.map((name) => ({ ...products.find((p) => p.name === name), qty: 0 })) : cart.map((item) => ({ ...products.find((p) => p.name === item.name), qty: item.qty }))).length ? (drawer === 'wishlist' ? wishlist.map((name) => ({ ...products.find((p) => p.name === name), qty: 0 })) : cart.map((item) => ({ ...products.find((p) => p.name === item.name), qty: item.qty }))).map((item) => <div className="cart-item" key={item.name}><img src={photo(item.img, 200)} alt="" /><div><h4>{item.name}</h4><small>{item.cat}</small><p>{money(item.price)}{item.qty ? ` · Qté ${item.qty}` : ''}</p></div><button className="remove" onClick={() => drawer === 'wishlist' ? toggleWishlist(item.name) : setCart((current) => current.filter((x) => x.name !== item.name))}>Retirer</button></div>) : <div className="empty">{drawer === 'wishlist' ? 'Votre liste est encore vide.' : 'Votre panier attend son premier coup de cœur.'}</div>}</div>
      <div className="cart-total">{drawer === 'cart' && cart.length > 0 && <><div><span>Sous-total</span><strong>{money(subtotal)}</strong></div><div><span>Livraison</span><span>Calculée à l’étape suivante</span></div><a className="button" href="mailto:bonjour@maisonaube.ci?subject=Ma%20commande">Passer la commande&nbsp; ↗</a></>}</div>
    </aside>
    <div className={`searchbox ${searchOpen ? 'show' : ''}`}><div className="search-line"><span>⌕</span><input placeholder="Que recherchez-vous ?" value={query} onChange={(event) => setQuery(event.target.value)} autoFocus={searchOpen} /><button className="close" onClick={closePanels} aria-label="Fermer la recherche">×</button></div><div className="search-results">{query ? searchResults.length ? searchResults.slice(0, 5).map((item) => <a href="#nouveautes" key={item.name} onClick={closePanels}>{item.name} · {money(item.price)}</a>) : 'Aucun résultat pour le moment.' : 'Rechercher dans la boutique · Vêtements · Parfums · Nouveautés'}</div></div>
  </>;
}

export default App;
