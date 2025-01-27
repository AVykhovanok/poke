import React, {useEffect, useState} from "react";
import {POKEMON_API_URL, POKEMON_IMG_URL} from "../utils/consts.ts";
import {Pokemon} from "../utils/types.ts";
import {fetchPokemon} from "../service/PokemonService.ts";
import {Button, Card, Row} from "antd";
import Meta from "antd/es/card/Meta";
import {StarFilled} from '@ant-design/icons';

const PokemonListPage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState(`${POKEMON_API_URL}?limit=20`);
    const [currentPage, setCurrentPage] = useState(0);
    const [likedPoke, setLikedPoke] = useState<Pokemon[]>([]);

    useEffect(() => {
        getData();
    }, [currentPage]);

    useEffect(() => {
        if (likedPoke.length > 0) {
            localStorage.setItem("likedPoke", JSON.stringify(likedPoke));
        }
    }, [likedPoke]);

    const getData = async () => {
        try {
            if (loading) return;
            setLoading(true);
            const data = await fetchPokemon(nextUrl);
            setNextUrl(data.next);
            setPokemons((prevPokemons) => [...prevPokemons, ...data.results]);
            setLoading(false);
        } catch (error) {
            console.error(`Error fetching data from URL -> ${POKEMON_API_URL}, error -> `, error);
        }
    };

    const prepareImgUrl = (url) => {
        const parts = url.split("/");
        const index = parts[parts.length - 2];
        return `${POKEMON_IMG_URL}${index}.svg`;
    }

    const handleLikeClick = (poke) => {
        if (!likedPoke.some(liked => liked.name === poke.name)) {
            setLikedPoke(prevLikes => [...prevLikes, poke]);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !loading) {
                    setCurrentPage(prev => prev + 1);
                }
            },
            {rootMargin: "100px"}
        );

        const target = document.getElementById("infinite-scroll-anchor");
        if (target) {
            observer.observe(target);
        }

        return () => {
            if (target) {
                observer.unobserve(target);
            }
        };
    }, [loading]);

    return (
        <div>
            <a href='/favorite'> Favorite</a>
            <Row gutter={[6, 6]} justify="start">
                {pokemons.map(poke => (
                    <Card
                        key={poke.name}
                        hoverable
                        cover={<img alt={poke.name} src={prepareImgUrl(poke.url)}/>}
                        style={{width: '15rem', margin: '1rem'}}
                    >
                        <Meta title={poke.name}/>
                        <Button
                            type="link"
                            icon={<StarFilled/>}
                            onClick={() =>
                                handleLikeClick({name: poke.name, url: poke.url})}
                        >
                        </Button>
                    </Card>
                ))}
            </Row>

            {loading && <div>Loading...</div>}

            <div id="infinite-scroll-anchor" style={{height: "1.25rem"}}></div>
        </div>
    );
};

export default PokemonListPage;
