import React from 'react';
import data from './data.json'



class JSRootExample extends React.Component {

    prepare_graph(type, fill_color, line_style){
        const current_data = data.stopping_power[type]
        if(current_data===undefined) return undefined;
    
        const graph = this.JSROOT.createTGraph(data.kinetic_energy.length, data.kinetic_energy, current_data);
        //const graph = this.JSROOT.createHistogram('TH1F', data.kinetic_energy.length-2);
        
        /*graph.fLineColor=fill_color;
        graph.fLineStyle=line_style;
        graph.fLineWidth=2;
        
        graph.fXaxis.fXbins=data.kinetic_energy;
        graph.fXaxis.fXmin=data.kinetic_energy[0];
        graph.fXaxis.fXmax=data.kinetic_energy[data.kinetic_energy.length-1];
        
        graph.fYaxis.fXbins=current_data;
        graph.fYaxis.fXmax=Math.max(...current_data);
        graph.fYaxis.fXmin=Math.min(...current_data);
        graph.fYaxis.fNbins=132;

        //console.log(, )
        for(let i=0;i<data.kinetic_energy.length;i++){
             graph.setBinContent(graph.getBin(i),current_data[i]);
        }/*
        data.kinetic_energy.forEach((v,k)=>{
            graph.Fill(k,current_data[k])
        })*/
        
        return graph;
        
    }

    componentDidMount() {
        
        //const g1 = this.prepare_graph('electronic',1,1);
        const g2 =this.prepare_graph('nuclear',1,1);
        //const g3 =this.prepare_graph('total',2,2);
        //const stack = this.JSROOT.createTHStack(/*g1,g3,*/ g2)

        g2.fFunctions.opt.push('LOGX');
        g2.fFunctions.opt.push('LOGY');

        console.log(g2);

        this.JSROOT.draw(this.canvas.current, g2,'LOGX');
        this.initJS();
    }

    constructor(props) {
        super(props);
        this.canvas = React.createRef();

        this.JSROOT = window.JSROOT;
        //console.log(this.JSROOT);
        //console.log(data);
    }



    initJS() {
        let cnt = 0;
        var histo = this.JSROOT.createHistogram("TH1I", 20);
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
        //console.log(histo);
        //this.JSROOT.draw(this.canvas.current, histo);
        //console.log("Did mount");
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