import React, {createRef} from 'react'
import StateData from "../../stateData_1.3.json"
import Country from "../../state_country.json"
import Color from "../../country_color.json"
import State from "../State/State";

import "./Map.css"

export default class Map extends React.Component {
    constructor() {
        super();
    }

    scrollContainerRef = createRef();

    isDragging = false;

    beginX=0;
    beginY=0;
    dragBegin=(e)=>{
        this.isDragging = true;
        this.beginX = e.clientX;
        this.beginY = e.clientY;
    }

    dragging=(e)=>{
        if(this.isDragging){
            let deltaX = e.clientX - this.beginX;
            let deltaY = e.clientY - this.beginY;
            this.beginX = e.clientX;
            this.beginY = e.clientY;
            this.scrollContainerRef.current.scrollTop -= deltaY;
            this.scrollContainerRef.current.scrollLeft -= deltaX;
        }
    }

    dragOver=()=>{
        this.isDragging = false;
    }

    render(){
        const {states} = StateData;
        const edition = "1.3";
        const scale=1;
        // console.log(states.length)
        return (
            <div className="scroll-container" ref={this.scrollContainerRef}>
                <div className={"scale"}>
                    <div className="map" draggable={"false"}>
                        <div className="world" style={{width:8192,height:3616}} onMouseDown={(e)=>{this.dragBegin(e)}} onMouseMove={(e)=>{this.dragging(e)}} onMouseUp={this.dragOver} onMouseLeave={this.dragOver}>
                            {
                                states.map((e)=>{
                                    let country = Country[e.stateName];
                                    let color = Color[country];
                                    return <State scale={scale} id={e.id} fileName={"./"+edition+"_states_doubleTransparent/"+e.stateName+".png"} borderfileName={"./"+edition+"_statesBorder_transparent/"+e.stateName+".png"} key={e.id} stateName={e.stateName} left={e.left} right={e.right} up={e.up} bottom={e.bottom} statePng={e.statePng} width={e.right-e.left+1} height={e.up-e.bottom+1} color={color} country={country}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
