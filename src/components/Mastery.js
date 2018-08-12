import React from 'react';

// represents a table that displays champion mastery data
class Mastery extends React.Component {

    render() {
        if (this.props.masteryJson != null && this.props.totalMastery != null) {
            console.log(this.props.masteryJson[0]);
            console.log(this.props.totalMastery);
        }
        return (
            <div>

            </div>
        );
    }

}

export default Mastery;
