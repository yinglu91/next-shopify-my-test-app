import { useState } from 'react'
import { Page } from "@shopify/polaris";
import { ResourcePicker } from '@shopify/app-bridge-react'

const Index = () => {
  const [open, setOpen] = useState(false)

  const handleSelection = (resources) => {
    const idFromResources = resources.selection.map((product) => product.id)
    setOpen(false)
    console.log(idFromResources)
  }

  return (
    <Page
      title="Product selector"
      primaryAction={{
        content: 'Select products',
        onAction: () => setOpen(true)
      }}
    >
      <ResourcePicker
        resourceType="Product"
        open={open}
        onCancel={() => setOpen(false)}
        onSelection={(resources) => handleSelection(resources)}
      />
    </Page>
  )
}

export default Index;

// https://shopify.dev/tools/app-bridge/react-components/resourcepicker
