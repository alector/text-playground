import React from 'react'
import { useState } from 'react'
import ShoppingList from './ShoppingList'
import AddPopularProduct from './AddPopularProduct'

const ShoppingApp = () => {
	const [shopList, setShopList] = useState([])

	const addToShopList = (product) => {
		setShopList([...shopList, product])
	}

	const removeFromShopList = (product) => {
		setShopList(shopList.filter((el) => el !== product))
	}
	return (
		<main className="row">
			<section className="col-lg-8">
				<ShoppingList
					shopList={shopList}
					removeFromShopList={removeFromShopList}
					addToShopList={addToShopList}
				/>
			</section>
			<section className="col-lg-4">
				<AddPopularProduct
					shopList={shopList}
					addToShopList={addToShopList}
				/>
			</section>
		</main>
	)
}

export default ShoppingApp
