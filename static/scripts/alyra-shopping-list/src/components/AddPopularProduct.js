import React from 'react'
import AddPopularProductForm from './AddPopularProductForm'

const AddPopularProduct = (props) => {
	const { shopList, addToShopList } = props
	const populars = [
		{ text: 'pain', emoji: '🥖' },
		{ text: 'lait', emoji: '🥛' },
		{ text: 'pizza', emoji: '🍕' },
		{ text: 'salade', emoji: '🥬' },
		{ text: 'oranges', emoji: '🍊' },
	]

	return (
		<section>
			<div className="bg-light border p-4">
				<h2 class="mb-3 h4">Ajouter un produit :</h2>

				<AddPopularProductForm
					shopList={shopList}
					addToShopList={addToShopList}
				/>

				<h3 className="h5">Avez vous besoin de ?</h3>
				<div className="mb-3 d-flex flex-wrap align-items-center">
					{populars.map((el) => (
						<button
							key={el.text}
							className="btn btn-outline-success me-2 mb-2 d-flex align-items-center"
							onClick={() => addToShopList(el.text)}
							disabled={shopList.includes(el.text)}
						>
							{el.text}{' '}
							<span className="fs-1" role="img" aria-hidden>
								{el.emoji}
							</span>
						</button>
					))}
				</div>
			</div>
		</section>
	)
}
export default AddPopularProduct
