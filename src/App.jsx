import { useState, useEffect, useRef } from "react";
import PostCard from "./components/PostCards";
import Search from "./components/Search";
import HeaderScroll from "./components/Scroll"; 

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const wrapperRef = useRef(null);


  const hideHeader = HeaderScroll(); 

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts.slice(0, 6)))
      .catch((err) => console.error(err));
  }, []);

  const filteredPosts = posts.filter((post) => {
    const query = search.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.body.toLowerCase().includes(query)
    );
  });

 
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    }

    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <>
      <header className={`header ${hideHeader ? "hide" : ""}`}>
        <div className="header__top">
          <button
            className="burger"
            aria-label="Открыть меню"
            onClick={() => setMenuOpen(true)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className="logo">LOGOTYPE</div>

          <Search
            search={search}
            setSearch={setSearch}
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            wrapperRef={wrapperRef}
          />
        </div>

        <nav className="menu">
          <ul className="menu__list">
            <li>
              <a href="#">Главная</a>
              <ul className="showmenu">
                <li>
                  <a href="#">Веб-разработка</a>
                </li>
                <li>
                  <a href="#">Дизайн</a>
                </li>
                <li>
                  <a href="#">Маркетинг</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#">О нас</a>
            </li>
            <li>
              <a href="#">Услуги</a>
            </li>
            <li>
              <a href="#">Контакты</a>
            </li>
          </ul>
        </nav>
      </header>

      <div
        className={`overlay ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(false)}
      ></div>

      <nav className={`mobile-menu ${menuOpen ? "active" : ""}`}>
        <button
          className="mobile-menu__close"
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>
        <ul>
          <li>
            <a href="#">Главная</a>
          </li>
          <li>
            <a href="#">О нас</a>
          </li>
          <li>
            <a href="#">Услуги</a>
          </li>
          <li>
            <a href="#">Контакты</a>
          </li>
        </ul>
      </nav>

      <div className="posts">
        <PostCard posts={filteredPosts} onPostClick={setSelectedPost} />
      </div>

      <div
        className={`modal ${selectedPost ? "active" : ""}`}
        onClick={() => setSelectedPost(null)}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          {selectedPost && (
            <>
              <h2>{selectedPost.title}</h2>
              <p>{selectedPost.body}</p>
              <button onClick={() => setSelectedPost(null)}>Close</button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
