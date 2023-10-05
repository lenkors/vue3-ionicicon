<template>
  <svg :class="`${hostElemStyleClasses}`" :color="color" aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>
<script setup lang="ts">
import 'virtual:svg-icons-register';
import { computed, ref, watchEffect } from 'vue';
import './style/icon.css';
import { getName, getUrl, isRTL } from './hooks/utils';
import { getSvgContent, ioniconContent } from './hooks/request';

const props = defineProps({
    /**
     * The mode determines which platform styles to use.
     */
    mode: {
        type: String,
        default: 'md',
    },
    /**
     * The color to use for the background of the item. 
     * @example #000000
     */
    color: String,
    /**
     * Specifies which icon to use on `ios` mode.
     */
    ios: String,
    /**
     * Specifies which icon to use on `md` mode.
     */    
    md: String,
    /**
     * Specifies whether the icon should horizontally flip when `dir` is `"rtl"`.
     */
    flipRtl: Boolean,
    /**
     * Specifies which icon to use from the built-in set of icons.
     */
    name: String,

    /**
     * Specifies the exact `src` of an SVG file to use.
     */
    src: String,

    /**
     * A combination of both `name` and `src`. If a `src` url is detected
     * it will set the `src` property. Otherwise it assumes it's a built-in named
     * SVG and set the `name` property.
     */
    icon: String,

    /**
     * The size of the icon.
     * Available options are: `"small"` and `"large"`.
     */
    size: String,

    /**
     * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
     * Default, `false`.
     */
    lazy: {
        type: Boolean,
        default: false
    },

    /**
     * When set to `false`, SVG content that is HTTP fetched will not be checked
     * if the response SVG content has any `<script>` elements, or any attributes
     * that start with `on`, such as `onclick`.
     * @default true
     */
    sanitize:{
        type: Boolean,
        default: true
    },

});

const iconName = ref<string | null>(null);
const svgContent = ref('');
const isVisible = ref(false);
const el = ref<HTMLElement>();

const symbolId = computed(() => `#${props.name}`)
const ionMode = computed(() => (!import.meta.env.SSR && typeof document !== 'undefined' && document.documentElement.getAttribute('mode')) || 'md');
const shouldAutoFlip = computed(() => iconName.value
      ? (iconName.value.includes('arrow') || iconName.value.includes('chevron')) && props.flipRtl !== false
      : false);
const shouldBeFlippable = computed(() => props.flipRtl ?? shouldAutoFlip.value);
const hostElemStyleClasses = computed(() => `${createColorClasses(props.color)} ${props.mode ?? 'md'} ${!!props.size ? `icon-${props.size}` : ''} ${!!shouldBeFlippable ? 'flip-rtl' : ''} ${shouldBeFlippable && isRTL(el.value) ? 'icon-rtl' : ''} ionicon host-item`)

const createColorClasses = (color: string | undefined) => {
  return !!color ? `ion-color ion-color-${color}` : 'ion-color';
};

const loadIcon = () => {
    if (!import.meta.env.SSR && isVisible.value) {
      const url = getUrl({src: props.src as string, name: props.name as string, icon: props.icon, mode: ionMode.value, ios: props.ios as string, md: props.md as string});

      if (url) {
        if (ioniconContent.has(url)) {
          // sync if it's already loaded
          svgContent.value = ioniconContent.get(url) as string;
        } else {
          // async if it hasn't been loaded
          getSvgContent(url, props.sanitize).then(() => (svgContent.value = ioniconContent.get(url) as string));
        }
      }
    }

    iconName.value = getName(props.name, props.icon, ionMode.value, props.ios, props.md);
  }

watchEffect(() => {
    if (
        props.name ||
        props.src ||
        props.icon ||
        props.ios ||
        props.md
    ) {
        loadIcon();
    }
});
</script>