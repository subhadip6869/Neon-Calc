import { OrbitControls, Sphere } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

const FloatingOrbs = () => {
	return (
		<Canvas className="fixed top-0 left-0 w-full h-full pointer-events-none">
			<ambientLight intensity={0.5} />
			<pointLight position={[10, 10, 10]} />
			{[...Array(5)].map((_, i) => (
				<Orb
					key={i}
					position={[
						Math.random() * 10 - 5,
						Math.random() * 10 - 5,
						Math.random() * -10,
					]}
				/>
			))}
			<OrbitControls enableZoom={false} autoRotate />
		</Canvas>
	);
};

const Orb = ({ position }) => {
	useFrame(({ clock }) => {
		// Float animation
	});
	return (
		<Sphere position={position} args={[0.2, 16, 16]}>
			<meshStandardMaterial
				color="#3b82f6"
				emissive="#3b82f6"
				emissiveIntensity={0.5}
			/>
		</Sphere>
	);
};

export default FloatingOrbs;
