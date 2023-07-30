import "../styles/index.css";
import CharacterSelection from "./CharacterSelection";
import { useState } from "react";
import { Character } from "../interfaces/Character";
import CharacterEpisodes from "./CharacterEpisodes";
import { rickAndMorty } from "../utils/Rick&Morty";
import { Episode } from "../interfaces/Episode";

function App() {
    const [character1, setCharacter1] = useState<Character | null>(null);
    const [character2, setCharacter2] = useState<Character | null>(null);
    const [showEpisodes, setShowEpisodes] = useState(false);
    const [character1Episodes, setCharacter1Episodes] = useState<Episode[]>([]);
    const [character2Episodes, setCharacter2Episodes] = useState<Episode[]>([]);
    const [bothCharactersEpisodes, setBothCharactersEpisodes] = useState<
        Episode[]
    >([]);

    const handleSearch = async () => {
        if (character1 && character2) {
            try {
                const rickMortyService = new rickAndMorty();

                const character1Episodes = await Promise.all(
                    character1.episode.map((url) =>
                        rickMortyService.getEpisodeByUrl(url)
                    )
                );
                const character2Episodes = await Promise.all(
                    character2.episode.map((url) =>
                        rickMortyService.getEpisodeByUrl(url)
                    )
                );

                // Filter episodes to find common ones
                const commonEpisodes = character1Episodes.filter((ep1) =>
                    character2Episodes.some((ep2) => ep2.id === ep1.id)
                );

                setCharacter1Episodes(character1Episodes);
                setCharacter2Episodes(character2Episodes);
                setBothCharactersEpisodes(commonEpisodes);

                setShowEpisodes(true);
            } catch (error) {
                console.error("Error fetching episodes:", error);
            }
        }
    };

    return (
        <div className="flex flex-col bg-rick&morty min-h-screen  bg-blend-saturation bg-slate-700 bg-opacity-90 p-10">
            <div className="flex flex-row h-[500px]">
                <CharacterSelection
                    selectCharacter={setCharacter1}
                    title="Character 1"
                />
                <CharacterSelection
                    selectCharacter={setCharacter2}
                    title="Character 2"
                />
            </div>
            <button
                className={`m-2 p-2 bg-blue-500 text-white rounded ${
                    character1 && character2
                        ? ""
                        : "opacity-50 cursor-not-allowed"
                }`}
                onClick={handleSearch}
                disabled={!character1 || !character2}
            >
                Search
            </button>
            {showEpisodes && (
                <div className="flex flex-row justify-between">
                    <CharacterEpisodes
                        episodes={character1Episodes}
                        title="Character 1 Episodes"
                    />
                    <CharacterEpisodes
                        episodes={bothCharactersEpisodes}
                        title="Both Characters Episodes"
                    />
                    <CharacterEpisodes
                        episodes={character2Episodes}
                        title="Character 2 Episodes"
                    />
                </div>
            )}
        </div>
    );
}

export default App;
