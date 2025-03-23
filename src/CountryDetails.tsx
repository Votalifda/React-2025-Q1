import {FC} from "react";
import {ICountry} from "./types.ts";

interface Props {
    item: ICountry;
    onClose: () => void;
}

const Country: FC<Props> = ({ item, onClose }) => {
    return (
        <div className="country-details">
            <img src={item.flags.png} alt={item.name.common} width={100}/>
            <p>{item.name.common}</p>
            <p>Population: {item.population.toLocaleString()}</p>
            <p>Region: {item.region}</p>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default Country;
