import React, {useEffect, useState} from "react";
import {POKEMON_API_URL, POKEMON_IMG_URL} from "../utils/consts.ts";
import {Pokemon} from "../utils/types.ts";
import {Button, Card, Row} from "antd";
import Meta from "antd/es/card/Meta";

const FavoriteListPage = () => {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nextUrl, setNextUrl] = useState(`${POKEMON_API_URL}?limit=20`);
    const [currentPage, setCurrentPage] = useState(0);
    const [likedPoke, setLikedPoke] = useState<Pokemon[]>([]);

    useEffect(() => {
        setPokemons(JSON.parse(localStorage.getItem("likedPoke")));
    }, []);

    const prepareImgUrl = (url) => {
        const parts = url.split("/");
        const index = parts[parts.length - 2];
        return `${POKEMON_IMG_URL}${index}.svg`;
    }


    return (
        <div>
            <a href='/'> All</a>
            <Row gutter={[6.25, 6.25]} justify="start">
                {pokemons.map(poke => (
                    <Card
                        key={poke.name}
                        hoverable
                        cover={<img alt={poke.name} src={prepareImgUrl(poke.url)}/>}
                        style={{width: '15rem', margin: '1rem'}}
                    >
                        <Meta title={poke.name}/>
                    </Card>
                ))}
            </Row>

            {loading && <div>Loading...</div>}

            <div id="infinite-scroll-anchor" style={{height: "1.25rem"}}></div>
        </div>
    );
};

export default FavoriteListPage;
