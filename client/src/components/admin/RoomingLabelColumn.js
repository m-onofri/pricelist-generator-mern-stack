import React from 'react';

const RoomingLabelColumn = () => {
    const fields = ["Period", "From", "To", "Adulti", "Ad 3-4", "Chd 3", "Chd 4", "Infant", "Culla", "Animal", "Sup. sing"];

    return (
        <div className="column rooming-column">
            {fields.map(field => <div class="input-block"><label>{field}</label></div>)}
        </div>
    )

}

export default RoomingLabelColumn;