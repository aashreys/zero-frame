import { render, Text, VerticalSpace } from '@create-figma-plugin/ui'
import { h } from 'preact'
import styles from './styles.css'

function Plugin() {
  return (
    <div class={styles.container}>
      <Text>
        New features to Zero Frame would have added too many menu options to be usable, so instead Zero Frame now intelligently runs features based on your selection.
      </Text>

      <VerticalSpace space="large" />

      <Text bold>
        Add Zero Frame
      </Text>
      <VerticalSpace space="extraSmall" />
      <Text>
        Adds a zero frame to currently selected frames and auto layouts, or if nothing is selected, the canvas.
      </Text>

      <VerticalSpace space="large" />

      <Text bold>
        Convert to Zero Frame
      </Text>
      <VerticalSpace space="extraSmall" />
      <Text>
        Converts currently selected frames and auto layouts to zero frames. Auto layouts retain their positioning properties.
      </Text>

      <VerticalSpace space="large" />

      <Text bold>
        Wrap in Zero Frame
      </Text>
      <VerticalSpace space="extraSmall" />
      <Text>
        Wraps currently selected layers in a zero frame.
      </Text>

    </div>
  )
}

export default render(Plugin)