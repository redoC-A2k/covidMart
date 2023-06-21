import { FILTERED_PRODUCTS } from "../types";
import {showErrorToast } from 'toast';
import {hideLoader} from "utility"
export const applyFilter = (price, category) => {
	return (dispatch) => {
		fetch(`${process.env.REACT_APP_BACKEND}/filter`, {
			method: "post",
			headers: {
				authorization: "Bearer " + localStorage.getItem("jwt"),
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				price: price,
				category: category,
			}),
		})
			.then((res) => res.json())
			.then((products) => {
				hideLoader()
				if (products.error) {
					window.location.href = `${process.env.REACT_APP_URL}/auth` 
					alert(products.error)
				}
				else if (products.length === 0) {
					showErrorToast("Applied filter does not match to our products range")
				}
				else {
					let newArrayOfProducts = [];
					let putInArray = (product) => {
						newArrayOfProducts.push(product);
					};
					new Promise((resolve, rej) => {
						products.map((product, ind) => {
							if (product.rating.length !== 0) {
								let sum = 0;
								new Promise((res, rej) => {
									let len = product.rating.length
									product.rating.map((eachRating, index) => {
										sum = sum + eachRating.value;
										if (index === len - 1) {
											res()
											console.log("resolved")
										}
									});
									sum = sum / len;
									product.rating = {
										value: sum,
									};
								}).then(() => {
									if (ind === products.length - 1)
										resolve()
									putInArray(product)
								});
							} else if (ind === products.length - 1) {
								product.rating = {
									value: 0,
								};
								putInArray(product);
								resolve();
							} else {
								product.rating = {
									value: 0,
								};
								putInArray(product);
							}
						});
					}).then(() => {
						dispatch({ type: FILTERED_PRODUCTS, products: newArrayOfProducts });
					});
				}
			});
	};
};
