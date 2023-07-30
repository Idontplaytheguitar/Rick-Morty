import React, { useState, useEffect, useRef, useCallback } from "react";
import { Character } from "../interfaces/Character";
import Card from "./Card";
import { rickAndMorty } from "../utils/Rick&Morty";

interface CharacterSelectionProps {
    selectCharacter: (character: Character) => void;
    title: string;
}

const CharacterSelection: React.FC<CharacterSelectionProps> = ({
    selectCharacter,
    title,
}) => {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [selectedCharacter, setSelectedCharacter] =
        useState<Character | null>(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const observer = useRef<IntersectionObserver>();

    const rickAndMortyService = new rickAndMorty();

    const lastCharacterElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        setLoading(true);
        setHasMore(false);
        (async () => {
            const data = await rickAndMortyService.getCharacter(page);
            setCharacters((prevCharacters) => [
                ...prevCharacters,
                ...data.results,
            ]);
            setHasMore(data.info.pages > page);
            setLoading(false);
        })();
    }, [page]);

    const handleCharacterSelect = (character: Character) => {
        setSelectedCharacter(character);
        selectCharacter(character);
    };

    return (
        <div className="h-half overflow-auto p-4">
            <h3 className="text-center text-3xl mb-4">{title}</h3>
            <div className="grid grid-cols-2 gap-4">
                {characters.map((character, index) => {
                    if (characters.length === index + 1) {
                        return (
                            <Card
                                character={character}
                                key={character.id}
                                classname={`${
                                    character === selectedCharacter
                                        ? "bg-purple-600 bg-opacity-50"
                                        : ""
                                }`}
                                onClick={() => handleCharacterSelect(character)}
                                ref={lastCharacterElementRef}
                            />
                        );
                    } else {
                        return (
                            <Card
                                character={character}
                                key={character.id}
                                classname={`${
                                    character === selectedCharacter
                                        ? "bg-purple-600 bg-opacity-50"
                                        : ""
                                }`}
                                onClick={() => handleCharacterSelect(character)}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default CharacterSelection;
