import Map from './Map';
import CarbonEmissions from './CarbonEmissions';
import UserInputs from './UserInputs';

export default function Responsive() {
    return (
        <div className = "flex justify-center space-x pl-1 pr-1 items-center">
            <UserInputs></UserInputs>
            <Map></Map>
            <CarbonEmissions></CarbonEmissions>
        </div>
    );
}