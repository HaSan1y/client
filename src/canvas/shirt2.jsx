import React from "react";
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";

import state from "../store/store";
import { Mesh } from "three";

const Shirt = () => {
	const snap = useSnapshot(state.state);
	const { nodes, materials } = useGLTF("/shirt_baked.glb");

	const logoTexture = useTexture(snap.logoDecal);
	const fullTexture = useTexture(snap.fullDecal);

	useFrame((_state, delta) => easing.dampC(materials.lambert1.color, snap.color, 0.25, delta));

	const stateString = JSON.stringify(snap);

	return (
		<group key={stateString}>
			<Mesh ref={nodes.T_Shirt_male.geometry} material={materials.lambert1} roughness={1}>
				{snap.isFullTexture && <Decal position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} map={fullTexture} />}

				{snap.isLogoTexture && <Decal position={[0, 0.04, 0.15]} rotation={[0, 0, 0]} scale={0.15} map={logoTexture} map-anisotropy={16} depthTest={false} depthWrite={true} />}
			</Mesh>
		</group>
	);
};

export default Shirt;
