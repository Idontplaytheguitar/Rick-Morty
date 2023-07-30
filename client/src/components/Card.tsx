import { forwardRef } from "react";
import { Character } from "../interfaces/Character";

interface CardProps {
    character: Character;
    classname: string;
    onClick: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    ({ character, classname, onClick }, ref) => {
        return (
            <div
                ref={ref}
                onClick={onClick}
                className={`card w-full flex text-center border-2 rounded-lg h-32 m-2 bg-blue-300 bg-opacity-10 hover:cursor-pointer hover:border-black ${classname}`}
            >
                <img
                    src={character.image}
                    alt="character"
                    className="w-1/2 object-cover"
                />
                <div className="flex flex-col justify-center w-1/2 px-2">
                    <h2 className="text-xl">{character.name}</h2>
                    <div className="flex justify-evenly">
                        <p>{character.status}</p>
                        <p>{character.species}</p>
                    </div>
                </div>
            </div>
        );
    }
);

export default Card;
