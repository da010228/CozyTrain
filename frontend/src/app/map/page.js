'use client';

import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import MapModal from "@/app/map/component/MapModal";
//import * as THREE from 'three';
import Globe from 'globe.gl';

import IBMRegular from '../../../public/fonts/IBM_Regular.json'
import MapCloseButton from "@/app/map/component/MapCloseButton";

export default function Map() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickContinent, setClickContinent] = useState("");
    const [clcikContinentEng, setClickContinentEng] = useState("");



    const globalRef = useRef(null);

    useEffect(() => {
        const continentArray = [
            {
                lat: 42.13407,
                lng: 120,
                label: "아시아",
                onLabelClick: () => {
                    setIsModalOpen(true);
                    setClickContinent("아시아");
                    setClickContinentEng("asia");
                }
            },
            {
                lat: 50.13407,
                lng: 43.62981,
                label: "유럽",
                onLabelClick: () => { }
            },
            {
                lat: 7.13407,
                lng: 21.62981,
                label: "아프리카",
                onLabelClick: () => { }
            },
            {
                lat: -27,
                lng: 135,
                label: "오세아니아",
                onLabelClick: () => { }
            },
            {
                lat: -18,
                lng: -55,
                label: "남아메리카",
                onLabelClick: () => { }
            },
            {
                lat: 38.13407,
                lng: -100,
                label: "북아메리카",
                onLabelClick: () => { }
            },
        ];


        if (typeof window !== 'undefined') {
            const globe = Globe()(globalRef.current);
            globe.globeImageUrl('images/map/earth.jpg')
                .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
                .labelText('label')
                .labelSize(1.5)
                .labelDotRadius(2.2)
                .labelTypeFace(IBMRegular)
                .labelColor((point) => {
                    if (point.label === '아시아') {
                        return 'rgba(220, 86, 95, 1)';
                    } else {
                        return 'rgba(142,142,142,1)';
                    }
                })
                .onLabelClick(point => point.onLabelClick())
                .labelsData(continentArray, { lat: 'lat', lng: 'lng', label: 'label' });
            return () => {
                globe;
            };
        }
    }, []);

    const closeModal = () => {
        setIsModalOpen(false);
    }


    return (
        <div className={styles.container}>
            <MapCloseButton />
            {isModalOpen &&
                <MapModal
                    text={`${clickContinent}로  이동하시겠습니까?`}
                    move={clcikContinentEng}
                    onCloseModal={closeModal}
                ></MapModal>
            }
            <div ref={globalRef} style={{ width: '100%', zIndex: '1' }} />
        </div>
    );
}