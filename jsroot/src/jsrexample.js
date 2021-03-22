import React from 'react';

class JSRootExample extends React.Component {

    componentDidMount() {
        this.initJS();
    }

    constructor(props) {
        super(props);
        this.canvas = React.createRef();
        this.state = {isReady: false};
    }

    initJS() {
        console.log(this.props)
        const JSROOT = window.JSROOT;
        console.log(JSROOT);
        if(typeof(JSROOT.createHistogram)=="function"){
            let cnt = 0;
            var histo = JSROOT.createHistogram("TH1I", 20);
            for (var iy = 0; iy < 20; iy++)
                for (var ix = 0; ix < 20; ix++) {
                    var bin = histo.getBin(ix + 1, iy + 1), val = 0;
                    switch (cnt % 4) {
                        case 1: val = ix + 19 - iy; break;
                        case 2: val = 38 - ix - iy; break;
                        case 3: val = 19 - ix + iy; break;
                        default: val = ix + iy; break;
                    }
                    histo.setBinContent(bin, val);
                }
            histo.fName = "generated";
            histo.fTitle = "Drawing " + cnt++;
            console.log(histo);
            JSROOT.draw(this.canvas.current, histo);
            console.log("Did mount");
            this.forceUpdate();
        }
    }

    render() {
        const { name } = this.props;
        return (
            <div className="JSRootExample">
                <h1>JSRoot Example {name}</h1>
                <div style={{
                    display: 'block',
                    margin: 'auto',
                    width: '90%',
                    height: '500px'
                }

                } ref={this.canvas}></div>
            </div>
        );
    }
}


export default JSRootExample;