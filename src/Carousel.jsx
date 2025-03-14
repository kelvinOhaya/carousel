//for changing variables and localStorage saving
import { useState, useEffect } from "react";
//for animation
import { motion } from "framer-motion";
//importing css module
import styles from "./carousel.module.css";

//main function
export default function Carousel({ imgList }) {
	//check if the user has any data on where they last stopped in the carousel. If they do, use that. If not, use the default index provided
	const [currentIndexes, setCurrentIndexes] = useState(() => {
		const storedObj = JSON.parse(localStorage.getItem("savedIndexes"));
		return storedObj
			? storedObj
			: {
					left: 0,
					current: 1,
					right: 2,
				};
	});

	//when the carousel shifts, save the current position in local storage so the user knows where they left off on reload
	useEffect(() => {
		localStorage.setItem("savedIndexes", JSON.stringify(currentIndexes));
	}, [currentIndexes]);

	//Controls the logic of the shifting of the elements in the carousel
	const handleButton = (symbol, e) => {
		e.preventDefault();

		/*
      Set the current index to shift one digit over or one digit back depending on the symbol.
      SYMBOL == '<'
      Use modular arithmetic to make sure the number never goes past the length of the list or under zero.
      Remember n % m == n unless n==m, then it is zero, allowing the loop to repeat
      SYMBOL == '>'
      Since modulo returns negative numbers in javascript, we need to do | ((n % m) + m) % m | to make sure we dont get negative numbers.
    */
		setCurrentIndexes((prevIndexes) => {
			let newIndexes = {}; //make a new index
			Object.keys(prevIndexes).forEach((key) => {
				//iterate through the keys in an object
				if (symbol === "<") {
					newIndexes[key] = (prevIndexes[key] + 1) % imgList.length; //shift one over using mod arithmetic described above
				} else if (symbol === ">") {
					newIndexes[key] =
						(((prevIndexes[key] - 1) % imgList.length) +
							imgList.length) %
						imgList.length; //shift one over using mod arithmetic described above
				}
			});

			// console.log(newIndexes); for debugging

			return newIndexes; //return the new object
		});
	};

	//content
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.contents}>
					<button
						onClick={(e) => handleButton(e.target.innerText, e)}
					>
						{"<"}
					</button>
					<div className={styles.images}>
						{imgList.map((item, index) => (
							<motion.div
								key={item.key}
								className={styles.image}
								/*This animation takes the elements in the list and applies animations where necessary*/
								animate={{
									opacity:
										index === currentIndexes.current
											? 1
											: index === currentIndexes.right ||
												  index === currentIndexes.left
												? 0.8
												: 0,
									scale:
										index === currentIndexes.current
											? 1
											: 0.8,
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
											? 1
											: index === currentIndexes.right ||
												  index === currentIndexes.left
												? -1
												: -999,
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
					<button
						onClick={(e) => handleButton(e.target.innerText, e)}
					>
						{">"}
					</button>
				</div>
			</div>
		</div>
	);
}
