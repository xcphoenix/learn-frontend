import React, {Component} from 'react';
import Counter from "./view/Counter";
import Summary from "./view/Summary";

class ControlPanel extends Component{

    render() {
        console.log('enter ControlPanel render');
        return (
            <div>
                <Counter caption="First" />
                <Counter caption="Second" />
                <Counter caption="Third" />
                <hr />
                <Summary />
            </div>
        );
    }

}

export default ControlPanel;