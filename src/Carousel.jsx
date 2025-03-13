import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./carousel.module.css";

export default function Carousel({ imgList }) {
    const [currentIndexes, setCurrentIndexes] = useState({
        left: 0,
        current: 1,
        right: 2,
    });

    const handleLeftButton = (e) => {
        e.preventDefault();

        setCurrentIndexes((prevIndexes) => {
            let newIndexes = {};
            Object.keys(prevIndexes).forEach((key) => {
                newIndexes[key] = prevIndexes[key] === imgList.length - 1 
                    ? 0 
                    : prevIndexes[key] + 1;
            });
            return newIndexes;
        });
    };

    const handleRightButton = (e) => {
        e.preventDefault();

        setCurrentIndexes((prevIndexes) => {
            let newIndexes = {};
            Object.keys(prevIndexes).forEach((key) => {
                newIndexes[key] = prevIndexes[key] === 0 
                    ? imgList.length - 1 
                    : prevIndexes[key] - 1;
            });
            return newIndexes;
        });
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.contents}>
                    <button onClick={handleLeftButton}>{"<"}</button>
                    <div className={styles.images}>
                        {imgList.map((item, index) => (
                            <motion.div
                                key={item.key}
                                className={styles.image}
                                animate={{
                                    opacity:
                                        index === currentIndexes.current
                                            ? 1
                                            : index === currentIndexes.right || index === currentIndexes.left
                                            ? 0.8
                                            : 0,
                                    scale: index === currentIndexes.current ? 1 : 0.8,
                                    x:
                                        index === currentIndexes.current
                                            ? 0
                                            : index === currentIndexes.right
                                            ? 150
                                            : index === currentIndexes.left
                                            ? -150
                                            : 0,
                                    zIndex:
                                        index === currentIndexes.current
                                            ? 10
                                            : index === currentIndexes.right || index === currentIndexes.left
                                            ? 5
                                            : -1,
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <img
                                    src={item.url}
                                    alt={item.title}
                                    style={{ width: "200px", height: "200px" }}
                                />
                                <h1>{item.title}</h1>
                            </motion.div>
                        ))}
                    </div>
                    <button onClick={handleRightButton}>{">"}</button>
                </div>
            </div>
        </div>
    );
}