import {FC} from "react";
import {ICountry} from "./types.ts";

interface Props {
    item: ICountry;
    onView: (ccn3: string) => void;
}

const Country: FC<Props> = ({ item, onView }) => {
    const handleOnView = () => {
        onView(item.ccn3);
    }

    return (
        <li className={`country ${item.visited && 'visited'}`}>
            <div className="country-card">
                <img src={item.flags.png} alt={item.name.common} width={50}/>
                <p>{item.name.common}</p>
                <p>Population: {item.population.toLocaleString()}</p>
                <p>Region: {item.region}</p>
            </div>
            <button onClick={handleOnView}>View</button>
        </li>
    );
};

export default Country;
