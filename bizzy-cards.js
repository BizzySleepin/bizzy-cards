import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.0.1/lit-element.js?module'

export const willyStyles = css`
  ha-card {
    margin-top: 32px;
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
    color: #8c96a5;
    display: block;
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
  .label {
    display: block;
    width: 100%;
    height: 20px;
    text-transform: capitalize;
    overflow: hidden;
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
    width: 50%;
  }
  .meter.battery {
    width: 61.5%;
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
  .divider {
    height: 1px;
    background-color: #727272;
    opacity: 0.25;
    margin-left: 8px;
    margin-right: 8px;
  }
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

const moreInfo = (entity) => {
  const ev = new Event('hass-more-info', {
    bubbles: true,
    cancelable: false,
    composed: true,
  })
  ev.detail = { entityId: entity }
  document.querySelector('home-assistant').dispatchEvent(ev)
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
    const items = this.config.entities.map((item) => this.hass.states[item])

    const attribute = (item) => {
      const val = item.state
      const aval = val !== 'unavailable' && val !== 'unknown' ? true : false
      const min = this.min
      return html`
        <div class="battery tooltip" data-tooltip="${aval ? val + '%' : val}">
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
        <div class="batteries">${items.map((item) => attribute(item))}</div>
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
    return [
      willyStyles,
      css`
        .batteries {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          padding-bottom: 8px;
        }
        .battery {
          display: block;
          box-sizing: border-box;
          width: 50%;
          padding: 8px 16px;
          white-space: normal;
        }
        .header > #name {
          margin-top: 20px;
        }
      `,
    ]
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
      const val = stateObj.attributes[attr]
      const aval = val !== 'unavailable' ? true : false

      if (attr !== 'battery') {
        const pct = 100 * Math.max(0, Math.min(1, (val - min) / (max - min)))
        return html`
          <div
            class="attribute clickable tooltip"
            data-tooltip="${aval ? val + ' ' + unit + ' | ' + min + ' ~ ' + max + ' ' + unit : val}"
            @action=${(ev) => {
              if (ev.detail.action === 'hold') moreInfo(stateObj.attributes.sensors[attr])
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
            class="attribute clickable tooltip"
            data-tooltip="${aval ? val + ' ' + unit : val}"
            @action=${(ev) => {
              if (ev.detail.action === 'hold') moreInfo(stateObj.attributes.sensors['battery'])
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
            if (ev.detail.action === 'tap') moreInfo(stateObj.entity_id)
          }}
        >
          <img src="${stateObj.attributes.image}" />
          <span id="name"> ${stateObj.attributes.name} <ha-icon .icon="mdi:${stateObj.state == 'problem' ? 'alert-circle-outline' : ''}"></ha-icon></span>
          <span id="subname">${species} </span>
        </div>
        <div class="divider"></div>
        <div class="attributes">${attribute('mdi:thermometer', 'temperature', limits['min_temperature'], limits['max_temperature'])} ${attribute('mdi:leaf', 'conductivity', limits['min_conductivity'], limits['max_conductivity'])}</div>
        <div class="attributes">
          ${attribute('mdi:water-percent', 'moisture', limits['min_moisture'], limits['max_moisture'])}
          ${this.useBattery ? attribute('mdi:battery-80', 'battery', 10) : attribute('mdi:white-balance-sunny', 'brightness', limits['min_brightness'], limits['max_brightness'])}
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
      willyStyles,
      css`
        .attributes {
          white-space: nowrap;
          padding: 8px;
        }
        .attribute ha-icon {
          float: left;
          margin-right: 4px;
        }
        .attribute {
          display: inline-block;
          width: 50%;
          white-space: normal;
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
      return html`
        <div class="inner">
          <span class="entity-text" @click="${() => moreInfo(item.entity_id)}">${item.attributes.friendly_name.replace(' Leak Sensor Water Leak', '')}</span>
          <span class="entity-states">
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
    const wet = sorted.filter((item) => item.state === 'on')
    const dry = sorted.filter((item) => item.state !== 'on')
    const items = wet.concat(dry)

    return html`
      <ha-card>
        <div class="outer">
          <details>
            <summary>
              <div class="card">
                <div class="shape ${items[0].state !== 'off' ? ' red' : items[0].attributes.battery < 10 ? ' yellow' : 'green'}">
                  <ha-icon icon="mdi:water"></ha-icon>
                </div>
                <div class="container">
                  <span class="primary">Leak Sensors</span>
                  <span class="secondary">${items[0].state !== 'off' ? 'Leak Detected! - ' : items[0].attributes.battery < 10 ? 'Low Batteries - ' : 'Everything is OK!'}</span>
                </div>
                <div class="toggle"><ha-icon icon="mdi:chevron-down"></ha-icon></div>
              </div>
            </summary>
            ${items.map((item) => sensor(item))}
          </details>
        </div>
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
    return css`
      .card {
        padding: 12px;
        align-items: center;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        width: 100%;
      }
      .shape {
        display: inline-flex;
        align-items: center;
        height: 42px;
        width: 42px;
        border-radius: 50%;
        background-color: rgba(111, 111, 111, 0.2);
        color: rgb(111, 111, 111);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 1px;
        font-size: 42px;
        justify-content: center;
        position: relative;
        transition-duration: 0.28s;
        transition-property: background-color, box-shadow;
        transition-timing-function: ease-out;
      }
      .shape + .shape {
        margin-left: 12px;
      }
      .shape ha-icon {
        display: flex;
        fill: rgb(76, 175, 80);
        font-size: 42px;
        transition-delay: 0s;
        transition-duration: 0.28s;
        transition-property: color;
        transition-timing-function: ease-in-out;
      }
      .shape.small {
        height: 30px;
        width: 30px;
      }
      .shape.small ha-icon {
        width: 18px;
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
      .container {
        display: flex;
        margin-left: 12px;
        flex-basis: 0%;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 1;
      }
      .primary {
        font-size: 14px;
        font-weight: 700;
        line-height: 21px;
        overflow-x: hidden;
        overflow-y: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .secondary {
        color: rgb(155, 155, 155);
        font-size: 12px;
        font-weight: 700;
        line-height: 18px;
        overflow-x: hidden;
        overflow-y: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .outer {
        margin-left: auto;
        margin-right: auto;
      }
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
      .entity-text {
        display: flex;
        align-items: center;
      }
      .entity-states {
        white-space: nowrap;
      }
    `
  }
}

customElements.define('leaks-card', leaksCard)
