import { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import RankingMobile from './mobile';
import RakingDesktop from './desktop';

const Ranking = () => {
  const [posts, setPosts] = useState([]);
  const [fishList, setFishList] = useState([]);
  const [selectedFish, setSelectedFish] = useState('');
  const [ranking, setRanking] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/portal/posts');
        const allPosts = response.data.posts;
        setPosts(allPosts);
        const species = [...new Set(allPosts.map(p => p.ryba))].filter(Boolean).sort();
        setFishList(species);
        if (species.length > 0) setSelectedFish(species[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!selectedFish) return;
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const filteredPosts = posts.filter(p => p.ryba === selectedFish && new Date(p.createdAt) >= lastYear);
    const userBestCatches = {};
    filteredPosts.forEach(p => {
      const userId = p.uzytkownik._id;
      if (!userBestCatches[userId] || p.rozmiar > userBestCatches[userId].rozmiar) {
        userBestCatches[userId] = { user: p.uzytkownik, rozmiar: p.rozmiar, data: p.createdAt, miejsce: p.miejsce };
      }
    });
    setRanking(Object.values(userBestCatches).sort((a, b) => b.rozmiar - a.rozmiar));
  }, [selectedFish, posts]);


  return (
    <div className="bg-surface font-body text-on-surface min-h-screen flex flex-col transition-colors duration-300 text-left">
      <style>{`
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
            display: inline-block;
            line-height: 1;
            text-transform: none;
            letter-spacing: normal;
            word-wrap: normal;
            white-space: nowrap;
            direction: ltr;
        }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- DESKTOP LAYOUT --- */}
      <div className="hidden md:flex flex-col min-h-screen">
        <RakingDesktop 
          isLoading={isLoading} 
          selectedFish={selectedFish} 
          setSelectedFish={setSelectedFish} 
          fishList={fishList}
          ranking={ranking}
        />
      </div>

      {/* --- MOBILE LAYOUT --- */}
      <div className="md:hidden flex flex-col min-h-screen pb-24">
        <RankingMobile 
          ranking={ranking} 
          isLoading={isLoading} 
          selectedFish={selectedFish} 
          setSelectedFish={setSelectedFish} 
          fishList={fishList} 
          />
      </div>
    </div>
  );
};

export default Ranking;
