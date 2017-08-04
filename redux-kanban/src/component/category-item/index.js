import React from 'react'
import {connect} from 'react-redux'
import {
  categoryUpdate,
  categoryDelete,
} from '../../action/category-actions.js'

import CategoryForm from '../category-form'
import CardForm from '../card-form'
import {cardCreate} from '../../action/card-actions.js'

class CategoryItem extends React.Component {
  render() {
    let {category, categoryUpdate, categoryDelete} = this.props
    return (
      <div className='category-item'>
        <header>
          <div className='content'>
            <h2>{category.title}</h2>
            <button onClick={() => categoryDelete(category)}>Delete</button>
          </div>
          <div className='editing'>
            <CategoryForm
              buttonText='update'
              category={category}
              onComplete={categoryUpdate}
            />
          </div>
        </header>
        <main>
          <CardForm
            categoryID={category.id}
            buttonText='create card'
            onComplete={this.props.cardCreate}
          />
          <ul>
            cards will go here
          </ul>
        </main>
      </div>

    )
  }
}

let mapStateToProps = () => ({})
let mapDispatchToProps = dispatch => ({
  categoryUpdate: (category) => dispatch(categoryUpdate(category)),
  categoryDelete: (category) => dispatch(categoryDelete(category)),
  cardCreate: (card) => dispatch(cardCreate(card)),
})

export default connect(mapStateToProps,mapDispatchToProps)(CategoryItem)
