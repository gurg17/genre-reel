import VoltButton from './VoltButton.vue'
import type { Meta, StoryFn } from '@storybook/vue3'

export default {
  title: 'Volt/VoltButton',
  component: VoltButton,
  argTypes: {
    label: { control: 'text', description: 'Button label' },
    disabled: { control: 'boolean', description: 'Disable the button' },
    loading: { control: 'boolean', description: 'Show loading spinner' },
    icon: { control: 'text', description: 'Icon class' },
    size: {
      control: { type: 'select', options: ['small', 'normal', 'large'] },
      description: 'Button size',
    },
    outlined: { control: 'boolean', description: 'Outlined style' },
    text: { control: 'boolean', description: 'Text style' },
    raised: { control: 'boolean', description: 'Raised style' },
    rounded: { control: 'boolean', description: 'Rounded style' },
  },
} as Meta<typeof VoltButton>

const Template: StoryFn<typeof VoltButton> = (args, { slots }) => ({
  components: { VoltButton },
  setup() {
    return { args }
  },
  template: `
        <VoltButton v-bind="args">
            <template v-if="args.icon" #icon>
                <i :class="args.icon"></i>
            </template>
            {{ args.label }}
        </VoltButton>
    `,
})

export const Default = Template.bind({})
Default.args = {
  label: 'Primary Button',
  disabled: false,
  loading: false,
  icon: '',
  size: 'normal',
  outlined: false,
  text: false,
  raised: false,
  rounded: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  ...Default.args,
  disabled: true,
  label: 'Disabled Button',
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  loading: true,
  label: 'Loading Button',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  ...Default.args,
  icon: 'pi pi-check',
  label: 'With Icon',
}
