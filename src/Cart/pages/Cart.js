import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import './cart.css'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProducts } from '../store/cartSlice'

const Cart = () => {
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.cart)
  const products = cart?.products

  useEffect(() => {
    dispatch(getCartProducts())
  }, [])

  const columns = [
    {
      headerName: 'Product',
      field: 'product',
    },
    {
      headerName: 'Price',
      field: 'price',
    },
    {
      headerName: 'Quantity',
      field: 'quantity',
      editable: true,
      cellEditor: 'quantityCellEditor',
      cellEditorParams: {
        onCommit: () => {},
      },
      components: {
        quantityCellEditor: QuantityCellEditor,
      },
    },
    {
      field: 'totalPrice',
    },
  ]

  const rowData = products?.map(
    (product) => (
      console.log('product', product),
      {
        product: product.product.imageCover,
        price: product.product.price,
        quantity: product.quantity,
        totalPrice: product.price,
      }
    )
  )

  const getRowHeight = (params) => {
    const rowHeight = 50 // default row height
    if (
      params.node &&
      params.node.rowIndex != null &&
      params.node.rowRenderer
    ) {
      const rowEl = params.node.rowRenderer.rowElement
      if (rowEl) {
        const rowHeight = rowEl.getBoundingClientRect().height
        return rowHeight
      }
    }
    return rowHeight
  }

  function onGridReady(params) {
    params.api.sizeColumnsToFit()
  }
  function QuantityCellEditor(props) {
    const [value, setValue] = useState(props.value)

    function onInputChange(event) {
      setValue(event.target.value)
    }

    function onMinusClick() {
      setValue(value - 1)
      props.stopEditing()
    }

    function onPlusClick() {
      setValue(value + 1)
      props.stopEditing()
    }

    function onKeyDown(event) {
      if (event.key === 'Enter') {
        props.stopEditing()
      }
    }

    return (
      <div className="quantity-cell-editor">
        <button onClick={onMinusClick}>-</button>
        <input
          type="number"
          value={value}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
        />
        <button onClick={onPlusClick}>+</button>
      </div>
    )
  }

  return (
    <div className="cart-container container">
      <div className="cart-left col-7">
        <h2>Permbajtjet e shportes</h2>
        <div
          className="ag-theme-alpine"
          style={{ height: '500px', minWidth: 900, width: '100%' }}
        >
          <AgGridReact
            rowData={rowData}
            columnDefs={columns}
            getRowHeight={getRowHeight}
            autoSizeColumns={true}
            onGridReady={onGridReady}
          ></AgGridReact>
        </div>
      </div>
      <div
        className="cart-right col-5 h-100"
        style={{ background: '#fafafa' }}
      ></div>
    </div>
  )
}

export default Cart
