'use client'

// React Imports
import { useState } from 'react'
import type { ComponentType } from 'react'

type OpenDialogOnElementClickProps = {
  element: ComponentType<any>
  dialog: ComponentType<any>
  elementProps?: any // Adjusted this to handle all element props
  dialogProps?: any
  onClose?: () => void // Added onClose prop
}

const OpenDialogOnElementClick = (props: OpenDialogOnElementClickProps) => {
  // Props
  const { element: Element, dialog: Dialog, elementProps, dialogProps, onClose } = props

  // States
  const [open, setOpen] = useState(false)

  // Extract onClick from elementProps, if exists
  const { onClick: elementOnClick, ...restElementProps } = elementProps

  // Handle onClick event and toggle the dialog
  const handleOnClick = (e: React.MouseEvent) => {
    if (elementOnClick) elementOnClick(e as React.MouseEvent<HTMLElement>) // Call original onClick if exists
    setOpen(true) // Open the dialog
  }

  // Handle dialog close
  const handleClose = () => {
    setOpen(false)
    if (onClose) onClose() // Call onClose if provided
  }

  return (
    <>
      {/* Receive element component as prop and pass the onClick handler */}
      <Element  onClick={handleOnClick} {...restElementProps} />

      {/* Receive dialog component as prop and pass open, setOpen, and onClose */}
      <Dialog open={open} setOpen={setOpen} onClose={handleClose} {...dialogProps} />
    </>
  )
}

export default OpenDialogOnElementClick
