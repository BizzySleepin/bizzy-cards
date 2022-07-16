import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.0.1/lit-element.js?module'

export const tooltipStyles = css`
  .tooltip {
    position: relative;
  }
  .tooltip:after {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    content: attr(data-tooltip);
    padding: 6px 10px;
    top: 1.4em;
    left: 50%;
    -webkit-transform: translateX(-50%) translateY(-180%);
    transform: translateX(-50%) translateY(-180%);
    background: grey;
    color: white;
    white-space: nowrap;
    z-index: 2;
    border-radius: 2px;
    transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), -webkit-transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
    transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
    transition: opacity 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1), -webkit-transform 0.2s cubic-bezier(0.64, 0.09, 0.08, 1);
  }
  .tooltip:hover:after,
  .tooltip:active:after {
    display: block;
    opacity: 1;
    visibility: visible;
    -webkit-transform: translateX(-50%) translateY(-200%);
    transform: translateX(-50%) translateY(-200%);
  }
`

export const iconStyles = css`
  .shape,
  .badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition-duration: 0.28s;
    transition-property: background-color, box-shadow;
    transition-timing-function: ease-out;
  }
  .shape {
    position: relative;
    height: 42px;
    width: 42px;
    background-color: rgba(var(--color-theme), 0.05);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 1px;
  }
  .shape + .shape {
    margin-left: 12px;
  }
  .shape > ha-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    transition: color 280ms ease-in-out 0s;
  }
  .shape.small {
    height: 30px;
    width: 30px;
  }
  .shape.full-icon {
    --mdc-icon-size: 100%;
  }
  .shape.grey {
    background-color: rgba(111, 111, 111, 0.2);
    color: rgb(111, 111, 111);
  }
  .shape.green {
    background-color: rgba(76, 175, 80, 0.2);
    color: rgb(76, 175, 80);
  }
  .shape.red {
    background-color: rgba(244, 67, 54, 0.2);
    color: rgb(244, 67, 54);
  }
  .shape.yellow {
    background-color: rgba(255, 204, 0, 0.2);
    color: rgb(255, 204, 0);
  }
  .badge {
    position: absolute;
    width: 16px;
    height: 16px;
    line-height: 0;
    color: white;
    background-color: grey;
  }
  .badge > ha-icon {
    --mdc-icon-size: 12px;
    transition: color 280ms ease-in-out 0s;
  }
  .badge.top-right {
    top: -3px;
    right: -3px;
  }
  .badge.top-left {
    top: -3px;
    left: -3px;
  }
  .badge.bottom-right {
    bottom: -3px;
    right: -3px;
  }
  .badge.bottom-left {
    bottom: -3px;
    left: -3px;
  }
`
export const chipStyles = css`
  .chip {
    background: var(--card-background-color, white);
    box-shadow: var(--ha-card-box-shadow, none);
    border-radius: var(--ha-card-border-radius, 4px);
    height: 36px;
  }
  .chip.shape {
    width: 36px;
    margin: 0;
  }
  .chip.title {
    width: auto;
    padding: 0 16px;
    font-size: 20px;
    font-weight: 700;
  }
  .chip-blank {
    width: 36px;
  }
`

export const iconHeaderStyles = css`
  .card {
    padding: 12px;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
`
export const imageHeaderStyles = css`
  ha-card {
    margin-top: 30px;
  }
  .header {
    padding-top: 8px;
    height: 72px;
  }
  .header > #name {
    font-weight: bold;
    width: 100%;
    margin-top: 16px;
    text-transform: capitalize;
    display: block;
  }
  .header > #subname {
    text-transform: capitalize;
    color: rgb(155, 155, 155);
    display: block;
    font-size: 12px;
    font-weight: 700;
    line-height: 18px;
  }
  .header > img {
    border-radius: 50%;
    width: 88px;
    margin-left: 16px;
    margin-right: 16px;
    margin-top: -32px;
    float: left;
    box-shadow: var(--ha-card-box-shadow, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2));
  }
  #name ha-icon {
    color: rgb(240, 163, 163);
  }
`

export const meterStyles = css`
  .entity-box {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 8px;
  }
  .meter-row {
    white-space: nowrap;
    padding: 8px;
  }
  .meter-box {
    display: inline-block;
    width: 50%;
    white-space: normal;
    padding: 12px;
    box-sizing: border-box;
  }
  .meter-box ha-icon {
    float: left;
    margin-right: 4px;
  }
  .meter {
    display: grid;
    height: 8px;
    background-color: #f1f1f1;
    border-radius: 2px;
    overflow: hidden;
  }
  .meter.section {
    display: inline-grid;
  }
  .meter.red {
    width: 10%;
  }
  .meter.green {
    width: 55%;
  }
  .meter.battery {
    width: 66.5%;
  }
  .meter > .good {
    background-color: rgba(43, 194, 83, 1);
  }
  .meter > .bad {
    background-color: rgba(240, 163, 163);
  }
  .meter > .unavailable {
    background-color: rgba(158, 158, 158, 1);
  }
  .meter > span {
    grid-row: 1;
    grid-column: 1;
    height: 100%;
  }
  .meter > span {
    grid-row: 1;
    grid-column: 1;
    height: 100%;
  }
`

export const dropdownStyles = css`
  .inner {
    height: 30px;
    padding: 12px 36px;
    display: flex;
    justify-content: space-between;
  }
  details .inner + .inner {
    padding-top: 0;
  }
  details + details {
    margin-top: 0.5rem;
  }
  summary {
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary {
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-between;
  }
  details[open] summary {
  }
  details[open] summary div .toggle {
    transform: rotate(180deg);
  }
  summary:hover {
  }
`

export const commonStyles = [
  iconStyles,
  chipStyles,
  tooltipStyles,
  css`
    .label {
      display: flex;
      align-items: center;
      text-transform: capitalize;
      overflow: hidden;
      white-space: nowrap;
    }
    .divider {
      height: 1px;
      background-color: #727272;
      opacity: 0.25;
      margin-left: 8px;
      margin-right: 8px;
    }
    .container {
      display: flex;
      flex-direction: column;
      flex: 1 1 0%;
      margin-left: 12px;
    }
    .container.center {
      margin-top: 6px;
      margin-left: 0px;
      align-items: center;
    }
    .primary,
    .secondary {
      overflow-x: hidden;
      overflow-y: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-transform: capitalize;
    }
    .primary {
      font-size: 14px;
      font-weight: 700;
      line-height: 18px;
    }
    .secondary {
      font-size: 12px;
      font-weight: 700;
      line-height: 18px;
      color: rgb(155, 155, 155);
    }
  `,
]

const handleAction = (config) => {
  const newEvent = (type) => {
    const ev = new Event(type, {
      bubbles: true,
      cancelable: false,
      composed: true,
    })
    ev.detail = config
    return ev
  }

  const hass = document.querySelector('home-assistant')
  switch (config.action) {
    case 'more-info':
      hass.dispatchEvent(newEvent('hass-more-info'))
      break
    case 'navigate':
      history.pushState(null, '', config.path)
      hass.dispatchEvent(newEvent('location-changed'))
      break
    case 'fire-dom-event':
      hass.dispatchEvent(newEvent('ll-custom'))
      break
  }
}

const bindActionHandler = (elements) => {
  customElements.whenDefined('action-handler').then(() => {
    const actionHandler = document.body.querySelector('action-handler')
    elements.forEach((el) => {
      actionHandler.bind(el, { hasHold: true, hasDoubleClick: true })
    })
  })
}
export class batteryCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  render() {
    const items = this.config.entities.filter((item) => this.hass.states[item]).map((item) => this.hass.states[item])

    const attribute = (item) => {
      const val = item.state
      const aval = val !== 'unavailable' && val !== 'unknown' ? true : false
      const min = this.min
      return html`
        <div class="meter-box tooltip" data-tooltip="${aval ? val + '%' : val}">
          <div class="label">${item.attributes.friendly_name.toLowerCase().replace(' battery', '')}</div>
          <div class="meter">
            <span class="${aval ? (val > min ? 'good' : 'bad') : 'unavailable'}" style="width:${aval ? val : 100}%;"></span>
          </div>
        </div>
      `
    }

    return html`
      <ha-card>
        <div class="header">
          <img src="${this.image}" />
          <span id="name"> ${this.title} </span>
        </div>
        <div class="divider"></div>
        <div class="entity-box">${items.map((item) => attribute(item))}</div>
      </ha-card>
    `
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error('You need to define entities')
    }
    this.config = config
    this.image = this.config.image || 'https://raw.githubusercontent.com/BizzySleepin/lovelace-battery-card/master/images/battery.jpg'
    this.title = this.config.name ? this.config.name : 'Batteries'
    this.min = this.config.min || 10
    this.requestUpdate()
  }

  static get styles() {
    return [commonStyles, meterStyles, imageHeaderStyles, css``]
  }
}

customElements.define('battery-card', batteryCard)

class FlowerCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  render() {
    const stateObj = this.hass.states[this.config.entity]

    if (!stateObj) {
      console.log('No plant found for entity ' + this.config.entity)
      return html``
    }

    const species = stateObj.attributes.species
    const limits = stateObj.attributes.limits

    const attribute = (icon, attr, min, max) => {
      const unit = stateObj.attributes.unit_of_measurement_dict[attr] || '%'
      const val = stateObj.attributes[attr] || 'unavailable'
      const aval = val !== 'unavailable' ? true : false

      if (attr !== 'battery') {
        const pct = 100 * Math.max(0, Math.min(1, (val - min) / (max - min)))
        return html`
          <div
            class="meter-box clickable tooltip"
            data-tooltip="${aval ? val + ' ' + unit + ' | ' + min + ' ~ ' + max + ' ' + unit : val}"
            @action=${(ev) => {
              if (ev.detail.action === 'hold') handleAction({ action: 'more-info', entityId: stateObj.attributes.sensors[attr] })
            }}
          >
            <ha-icon .icon="${icon}"></ha-icon>
            <div class="meter section red">
              <span class="${aval ? (val < min || val > max ? 'bad' : 'good') : 'unavailable'}" style="width: 100%;"></span>
            </div>
            <div class="meter section green">
              <span class="${aval ? (val > max ? 'bad' : 'good') : 'unavailable'}" style="width:${aval ? pct : '0'}%;"></span>
            </div>
            <div class="meter section red">
              <span class="bad" style="width:${aval ? (val > max ? 100 : 0) : '0'}%;"></span>
            </div>
          </div>
        `
      } else {
        return html`
          <div
            class="meter-box clickable tooltip"
            data-tooltip="${aval ? val + ' ' + unit : val}"
            @action=${(ev) => {
              if (ev.detail.action === 'hold') handleAction({ action: 'more-info', entityId: stateObj.attributes.sensors['battery'] })
            }}
          >
            <ha-icon .icon="${icon}"></ha-icon>
            <div class="meter section red">
              <span class="${aval ? (val < min ? 'bad' : 'good') : 'unavailable'}" style="width: 100%;"></span>
            </div>
            <div class="meter section battery">
              <span class="${aval ? 'good' : 'unavailable'}" style="width:${aval ? val - 10 : '0'}%;"></span>
            </div>
          </div>
        `
      }
    }

    return html`
      <ha-card>
        <div
          class="header clickable"
          @action=${(ev) => {
            if (ev.detail.action === 'tap') handleAction({ action: 'more-info', entityId: stateObj.entity_id })
          }}
        >
          <img src="${stateObj.attributes.image}" />
          <span id="name"> ${stateObj.attributes.name} <ha-icon .icon="mdi:${stateObj.state == 'problem' ? 'alert-circle-outline' : ''}"></ha-icon></span>
          <span id="subname">${species} </span>
        </div>
        <div class="divider"></div>
        <div class="entity-box">
          ${attribute('mdi:water-percent', 'moisture', limits['min_moisture'], limits['max_moisture'])}
          ${this.useBattery ? attribute('mdi:battery-80', 'battery', 10) : attribute('mdi:white-balance-sunny', 'brightness', limits['min_brightness'], limits['max_brightness'])}
          ${attribute('mdi:thermometer', 'temperature', limits['min_temperature'], limits['max_temperature'])} ${attribute('mdi:leaf', 'conductivity', limits['min_conductivity'], limits['max_conductivity'])}
        </div>
      </ha-card>
    `
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity')
    }
    this.config = config
    this.useBattery = this.config.useBattery
    this.requestUpdate()
  }

  firstUpdated() {
    bindActionHandler(this.shadowRoot.querySelectorAll('.clickable'))
  }

  static get styles() {
    return [
      commonStyles,
      meterStyles,
      imageHeaderStyles,
      css`
        ha-card {
          margin-top: 30px;
        }
      `,
    ]
  }
}

customElements.define('flower-card', FlowerCard)

class leaksCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  script() {
    return
  }

  render() {
    const sensor = (item) => {
      const name = item.attributes.friendly_name.toLowerCase().replace(' leak sensor water leak', '')
      return html`
        <div class="inner">
          <span class="label" @click="${() => handleAction({ action: 'more-info', entityId: item.entity_id })}">${name}</span>
          <span class="badge-box">
            <div class="shape small ${item.attributes.battery > 10 ? ' green' : ' yellow'}">
              <ha-icon icon="mdi:battery${item.attributes.battery === 100 ? '' : '-' + Math.round(item.attributes.battery / 10) * 10}"></ha-icon>
            </div>
            <div class="shape small ${item.state === 'off' ? 'green' : ' red'}">
              <ha-icon icon="mdi:water"></ha-icon>
            </div>
          </span>
        </div>
      `
    }

    const sorted = this.config.entities
      .map((item) => this.hass.states[item])
      .sort((a, b) => {
        if (a.attributes.battery > b.attributes.battery) {
          return 1
        }
        if (a.attributes.battery < b.attributes.battery) {
          return -1
        }
        return 0
      })
    const wet = sorted.filter((item) => item && item.state === 'on')
    const dry = sorted.filter((item) => item && item.state !== 'on')
    const items = wet.concat(dry)

    const status = items[0].state !== 'off' ? 'Leak Detected!' : items[0].attributes.battery < 10 ? 'Low Batteries' : 'Everything is OK!'

    return html`
      <ha-card>
        <details>
          <summary>
            <div class="card">
              <div class="shape ${items[0].state !== 'off' ? ' red' : items[0].attributes.battery < 10 ? ' yellow' : 'green'}">
                <ha-icon icon="mdi:pipe-leak"></ha-icon>
              </div>
              <div class="container">
                <span class="primary">Leak Sensors</span>
                <span class="secondary">${status}</span>
              </div>
              <div class="toggle"><ha-icon icon="mdi:chevron-down"></ha-icon></div>
            </div>
          </summary>
          <div class="divider"></div>
          ${items.map((item) => sensor(item))}
        </details>
      </ha-card>
    `
  }

  setConfig(config) {
    if (!config.entities) {
      throw new Error('You need to define entities')
    }
    this.config = config
    this.requestUpdate()
  }

  static get styles() {
    return [
      commonStyles,
      dropdownStyles,
      iconHeaderStyles,
      css`
        .badge-box {
          min-width: 76px;
          margin-left: 10px;
        }
      `,
    ]
  }
}

customElements.define('leaks-card', leaksCard)

class valveCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  script() {
    return
  }

  render() {
    const item = this.hass.states[this.config.entity].state
    return html`
      <ha-card>
        <div class="card">
          <div class="shape ${item == 'on' ? ' green' : item == 'off' ? 'red' : 'unavailable'}">
            <ha-icon icon="mdi:water"></ha-icon>
          </div>
          <div class="container">
            <span class="primary">Water Valve</span>
            <span class="secondary">Valve is ${item == 'on' ? 'Open!' : item == 'off' ? 'Closed!' : 'Unavailable!'}</span>
          </div>
        </div>
      </ha-card>
    `
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity')
    }
    this.config = config
    this.requestUpdate()
  }

  static get styles() {
    return [commonStyles, iconHeaderStyles]
  }
}

customElements.define('valve-card', valveCard)
class vehicleCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  script() {
    return
  }

  render() {
    return html`
      <ha-card>
        <div
          class="card clickable"
          @action=${(ev) => {
            if (ev.detail.action === 'tap') handleAction(this.config.tap_action)
          }}
        >
          <div class="shape full-icon">
            <ha-icon icon="mdi:car"></ha-icon>
          </div>
          <div class="container">
            <span class="primary">Mazda 3</span>
            <span class="secondary">Home</span>
          </div>
        </div>
      </ha-card>
    `
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity')
    }
    this.config = config
    this.requestUpdate()
  }

  firstUpdated() {
    bindActionHandler(this.shadowRoot.querySelectorAll('.clickable'))
  }

  static get styles() {
    return [commonStyles, iconHeaderStyles]
  }
}

customElements.define('vehicle-card', vehicleCard)

class topBarCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  script() {
    return
  }

  render() {
    const side = (button) => {
      if (button === 'back') {
        return html`
          <div class="chip shape" @click="${() => window.history.back()}">
            <ha-icon icon="mdi:arrow-left"></ha-icon>
          </div>
        `
      } else if (button === 'home') {
        const home = this.config.home || '/lovelace/default_view'
        return html`
          <div class="chip shape" @click="${() => handleAction({ action: 'navigate', path: home })}">
            <ha-icon icon="mdi:home"></ha-icon>
          </div>
        `
      } else if (button === 'config') {
        return html`
          <div class="chip shape">
            <ha-icon icon="mdi:cog"></ha-icon>
          </div>
        `
      } else {
        return html` <div class="chip-blank"></div> `
      }
    }

    return html`
      <ha-card>
        ${side(this.config.left)}
        <div class="chip shape title">${this.config.title}</div>
        ${side(this.config.right)}
      </ha-card>
    `
  }

  setConfig(config) {
    this.config = config
  }

  static get styles() {
    return [
      commonStyles,
      css`
        ha-card {
          background: none;
          box-shadow: none;
          display: flex;
          justify-content: space-between;
        }
      `,
    ]
  }
}

customElements.define('top-bar-card', topBarCard)

class chipBoxCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  script() {
    return
  }

  render() {
    const states = (entities = []) => {
      return entities.map((item) => {
        const state = parseFloat(this.hass.states[item.entityId].state) ? parseFloat(parseFloat(this.hass.states[item.entityId].state).toFixed(1)) : this.hass.states[item.entityId].state
        const attr = this.hass.states[item.entityId].attributes
        const max = item.max || ''
        const min = item.min || ''
        const maxColor = item.maxColor || 'red'
        const minColor = item.minColor || 'blue'
        const color = max && state > max ? maxColor : min && state < min ? minColor : 'black'
        const unit = item.unit === true ? attr.unit_of_measurement || '' : item.unit || ''
        return html`<p style="color: ${color}">${state + (item.spaceUnit === true ? ' ' : '') + unit}</p>`
      })
    }

    const weatherChip = (state, entities) => {
      const getWeatherEmoji = (i) => {
        if (i == 'clear-night') return '🌙'
        if (i == 'cloudy') return '☁️'
        if (i == 'exceptional') return '🌞'
        if (i == 'fog') return '🌫️'
        if (i == 'hail') return '⛈️'
        if (i == 'lightning') return '⚡'
        if (i == 'lightning-rainy') return '⛈️'
        if (i == 'partlycloudy') return '⛅'
        if (i == 'pouring') return '🌧️'
        if (i == 'rainy') return '💧'
        if (i == 'snowy') return '❄️'
        if (i == 'snowy-rainy') return '🌨️'
        if (i == 'sunny') return '☀️'
        if (i == 'windy') return '🌪️'
      }
      return html`${getWeatherEmoji(state)} ${states(entities)}`
    }

    const alarmChip = (state, size = 'small') => {
      const getAlarmData = (i) => {
        if (i == 'armed_home') return { icon: 'mdi:shield-home', state: 'Armed - Home', color: 'var(--google-red)' }
        if (i == 'armed_away') return { icon: 'mdi:shield-lock', state: 'Armed - Away', color: 'var(--google-red)' }
        if (i == 'armed_night') return { icon: 'mdi:shield-moon', state: 'Armed - Night', color: 'var(--google-red)' }
        if (i == 'arming') return { icon: 'mdi:shield', state: 'Arming', color: 'var(--google-yellow)' }
        if (i == 'disarmed') return { icon: 'mdi:shield-off', state: 'Disarmed', color: 'var(--google-green)' }
        if (i == 'triggered') return { icon: 'mdi:shield-alert', state: 'Triggered', color: 'var(--google-red)' }
        return { icon: 'mdi:shield-outline', state: 'Unknown', color: 'var(--google-black)' }
      }
      const data = getAlarmData(state)
      return html`<ha-icon icon="${data.icon}" style="color: ${data.color}" class="${size}"></ha-icon>
        <p>${data.state}</p>`
    }

    const chip = (item) => {
      const createChip = (type = 'custom', icon = '', color = 'black', text = '', size = 'small', entities = []) => {
        if (type == 'weather' && icon) return weatherChip(this.hass.states[icon].state, entities)
        if (type == 'alarm' && icon) alarmChip(this.hass.states[icon].state, size)
        if (icon.startsWith('mdi:')) return html`<ha-icon class="${size}" style="color: ${color}" icon="${icon}"></ha-icon>${text}${states(entities)}`
        return html`${icon} ${text} ${states(entities)}`
      }
      return html` <div class="chip ${item.size || ''}">${createChip(item.type, item.icon, item.color, item.text, item.size, item.entities)}</div>`
    }

    return html` <ha-card> ${this.config.chips.map((item) => chip(item))} </ha-card> `
  }

  setConfig(config) {
    this.config = config
  }

  static get styles() {
    return [
      commonStyles,
      css`
        ha-card {
          display: flex;
          background: none;
          box-shadow: none;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }
        .chip {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          width: auto;
          font-size: 14px;
          font-weight: 700;
          margin: 0px;
          padding: 0px 12px;
          background: var(--card-background-color, white);
          box-shadow: var(--ha-card-box-shadow, none);
          border-radius: var(--ha-card-border-radius, 4px);
          transition-duration: 0.28s;
          transition-property: background-color, box-shadow;
          transition-timing-function: ease-out;
          --ha-icon-display: block;
          --mdc-icon-size: 16px;
        }
        .chip.small {
          --mdc-icon-size: 14px;
          font-size: 12px;
        }
        p:first-of-type {
          margin-left: 5px;
        }
        ha-icon {
          margin-right: 5px;
          display
        }
        p + p::before {
          content: '/';
          color: black;
          margin-left: 5px;
          margin-right: 5px;
        }
      `,
    ]
  }
}

customElements.define('chip-box-card', chipBoxCard)

class personCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  script() {
    return
  }

  render() {
    const stateObj = this.hass.states[this.config.entity]
    const name = stateObj.attributes.friendly_name
    const zone = stateObj.state == 'not_home' ? 'Away' : this.hass.states[`zone.${stateObj.state}`].attributes.friendly_name
    const badge = stateObj.state == 'not_home' ? 'mdi:home-minus' : this.hass.states[`zone.${stateObj.state}`].attributes.icon
    const color = stateObj.state == 'home' ? 'rgb(76, 175, 80)' : stateObj.state == 'not_home' ? 'red' : 'blue'
    const image = this.config.useImage ? html`<img src="${stateObj.attributes.entity_picture}" />` : html`<ha-icon icon="mdi:account"></ha-icon>`
    return html`
      <ha-card>
        <div class="shape">
          ${image}
          <div class="badge top-right" style="background-color: ${color};">
            <ha-icon icon="${badge}"></ha-icon>
          </div>
        </div>
        <div class="container center">
          <div class="primary">${name}</div>
          <div class="secondary">${zone}</div>
        </div>
      </ha-card>
    `
  }

  setConfig(config) {
    this.config = config
  }

  static get styles() {
    return [
      commonStyles,
      css`
        ha-card {
          padding: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
        }
        img {
          border-radius: 50%;
          height: 100%;
          width: 100%;
        }
      `,
    ]
  }
}

customElements.define('person-card', personCard)
class verticalEntityCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
    }
  }

  script() {
    return
  }

  render() {
    const stateObj = this.hass.states[this.config.entity]
    const title = this.config.title || stateObj.attributes.friendly_name || 'Unknown'
    const icon = this.config.icon || stateObj.attributes.icon || 'mdi:help'
    const state = this.config.state || stateObj.state || 'Unavailable'
    return html`
      <ha-card>
        <div class="shape">
          <ha-icon icon="${icon}"></ha-icon>
        </div>
        <div class="container center">
          <div class="primary">${title}</div>
          <div class="secondary">${state}</div>
        </div>
      </ha-card>
    `
  }

  setConfig(config) {
    this.config = config
  }

  static get styles() {
    return [
      commonStyles,
      css`
        ha-card {
          padding: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
        }
        img {
          border-radius: 50%;
          height: 100%;
          width: 100%;
        }
      `,
    ]
  }
}

customElements.define('vertical-entity-card', verticalEntityCard)

class gaugeCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      config: {},
      cards: { type: Array, attribute: false },
    }
  }

  script() {
    return
  }

  render() {
    const stateObj = this.hass.states[this.config.entity]
    const title = this.config.title || stateObj.attributes.friendly_name || 'Unknown'
    const icon = this.config.icon || stateObj.attributes.icon || 'mdi:help'
    const state = stateObj.state || 0
    console.log(cards)
    return html`
      <ha-card>
        <div class="gauge" style="--gauge-value: ${state * 0.005 + 'turn'}">
          <div class="gauge--background"></div>
          <div class="gauge--data"></div>
          <div class="gauge--center">
            <ha-icon icon="${icon}"></ha-icon>
          </div>
        </div>
        <div class="container center">
          <div class="primary">${title}</div>
          <div class="secondary">${state}%</div>
        </div>
      </ha-card>
    `
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity')
    }
    this.config = config
  }

  static get styles() {
    return [
      commonStyles,
      css`
        ha-card {
          padding: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          flex-direction: column;
        }
        .gauge {
          --gauge-size: 42px;
          --mdc-icon-size: calc(var(--gauge-size) / 1.5);
          position: relative;
          height: var(--gauge-size);
          width: calc(var(--gauge-size) * 2);
          overflow: hidden;
        }
        .gauge--background {
          z-index: 0;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          background-color: #c5cae9;
          border-radius: 300px 300px 0 0;
        }
        .gauge--data {
          z-index: 1;
          position: absolute;
          top: 100%;
          height: 100%;
          width: 100%;
          background-color: rgb(61, 90, 254);
          border-radius: 0 0 300px 300px;
          transition: transform 1s ease-in-out;
          transform-origin: center top;
          transform: rotate(var(--gauge-value, 0turn));
        }
        .gauge--center {
          z-index: 2;
          position: absolute;
          width: calc(var(--gauge-size) * 1.2);
          height: calc(var(--gauge-size) * 0.6);
          top: calc(var(--gauge-size) * 0.4);
          left: calc(var(--gauge-size) * 0.4);
          background-color: var(--card-background-color, white);
          border-radius: 300px 300px 0 0;
          display: flex;
          justify-content: center;
          align-items: center;
          padding-top: calc(var(--gauge-size) / 10);
        }
      `,
    ]
  }
}

customElements.define('gauge-card', gaugeCard)
