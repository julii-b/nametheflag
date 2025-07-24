import { useState, type JSX } from "react";
import InfoWindowButton from "./InfoWindowButton";
import InfoWindowInfo from "./InfoWindowInfo";

/**
 * An info-button and an info-window about the project and the used resources.
 * 
 * @returns {JSX.Element}
 */
function InfoWindowContainer(): JSX.Element {

    const [infoWindowState, setInfoWindowState] = useState<"show"|"dontShow">("dontShow");

    return (
        <>
        {infoWindowState == "dontShow" && (
            <InfoWindowButton onOpen={()=>{setInfoWindowState("show")}} />
        )}
        {infoWindowState == "show" && (
            <InfoWindowInfo onClose={()=>{setInfoWindowState("dontShow")}} />
        )}
        </>
    );
}

export default InfoWindowContainer;