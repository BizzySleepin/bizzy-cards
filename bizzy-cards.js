import { LitElement, html, css } from 'https://unpkg.com/lit-element@2.0.1/lit-element.js?module'
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
    return css`
      ha-card {
        margin-top: 32px;
      }
      .header {
        padding-top: 8px;
        height: 72px;
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
      .header > #name {
        font-weight: bold;
        width: 100%;
        margin-top: 20px;
        text-transform: capitalize;
        display: block;
      }
      #name ha-icon {
        color: rgb(240, 163, 163);
      }
      .header > #species {
        text-transform: capitalize;
        color: #8c96a5;
        display: block;
      }
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
        width: 100%;
        background-color: #f1f1f1;
        border-radius: 2px;
      }
      .meter > span {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
      }
      .meter > .good {
        background-color: rgba(43, 194, 83, 1);
        border-radius: 2px;
      }
      .meter > .bad {
        background-color: rgba(240, 163, 163);
        border-radius: 2px;
      }
      .meter > .unavailable {
        background-color: rgba(158, 158, 158, 1);
        border-radius: 2px;
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
  }
}

customElements.define('battery-card', batteryCard)

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
          <span class="center">${item.attributes.friendly_name.replace(' Leak Sensor Water Leak', '')}</span>
          <span class="circles">
            <div class="circle ${item.attributes.battery > 10 ? '' : ' attention'}">
              <ha-icon icon="mdi:battery${item.attributes.battery === 100 ? '' : '-' + Math.round(item.attributes.battery / 10) * 10}"></ha-icon>
            </div>
            <div class="circle ${item.state === 'off' ? '' : ' warning'}">
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
              <div class="title center">
                <ha-icon icon="mdi:water"></ha-icon>
                <span>Leak Sensors</span>
                <div class="toggle"><ha-icon icon="mdi:chevron-down"></ha-icon></div>
              </div>
              <div class="title-icons">
                <span class="state">${items[0].state !== 'off' ? 'Leak Detected! - ' : items[0].attributes.battery < 10 ? 'Low Batteries - ' : ''}</span>
                <div class="circle ${items[0].state !== 'off' ? ' warning' : items[0].attributes.battery < 10 ? ' attention' : ''}">
                  <ha-icon icon="mdi:${items[0].state !== 'off' ? 'water-alert' : 'check-bold'}"></ha-icon>
                </div>
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
      *:focus {
        outline: none;
      }
      body {
        //background-color: #000;
      }
      .outer {
        width: 90%;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }
      .inner {
        height: 30px;
        padding: 1em 1.5em 1.5em;
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
        padding: 0.75em 0;
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: space-between;
      }
      .title {
        font-weight: bold;
      }
      .title-icons {
        display: flex;
        align-items: center;
      }
      .state {
        margin-right: 0.5rem;
      }
      .center {
        display: flex;
        align-items: center;
      }
      .circles {
        white-space: nowrap;
      }
      .circle {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background-color: #50c878;
        border-radius: 50%;
      }
      .circle + .circle {
        margin-left: 1rem;
      }
      .circle.attention {
        background-color: #eed202;
      }
      .circle.warning {
        background-color: #d0342c;
      }
      details[open] summary {
      }
      details[open] summary div .toggle {
        transform: rotate(180deg);
      }
      summary:hover {
      }
    `
  }
}

customElements.define('leaks-card', leaksCard)
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

    const moreInfo = (entity) => {
      hass.callService('light', 'turn_on', {
        entity_id: 'light.kitchen',
      })
    }

    const attribute = (icon, attr, min, max) => {
      const unit = stateObj.attributes.unit_of_measurement_dict[attr] || '%'
      const val = stateObj.attributes[attr]
      const aval = val !== 'unavailable' ? true : false

      if (attr !== 'battery') {
        const pct = 100 * Math.max(0, Math.min(1, (val - min) / (max - min)))
        return html`
          <div class="attribute tooltip" data-tooltip="${aval ? val + ' ' + unit + ' | ' + min + ' ~ ' + max + ' ' + unit : val}" @click="${() => fireEvent(this, 'hass-more-info', stateObj.attributes.sensors[attr])}">
            <ha-icon .icon="${icon}"></ha-icon>
            <div class="meter red">
              <span class="${aval ? (val < min || val > max ? 'bad' : 'good') : 'unavailable'}" style="width: 100%;"></span>
            </div>
            <div class="meter green">
              <span class="${aval ? (val > max ? 'bad' : 'good') : 'unavailable'}" style="width:${aval ? pct : '0'}%;"></span>
            </div>
            <div class="meter red">
              <span class="bad" style="width:${aval ? (val > max ? 100 : 0) : '0'}%;"></span>
            </div>
          </div>
        `
      } else {
        return html`
          <div class="attribute tooltip" data-tooltip="${aval ? val + ' ' + unit : val}" @click="${() => cardTools.moreInfo(stateObj.attributes.sensors['battery'])}">
            <ha-icon .icon="${icon}"></ha-icon>
            <div class="meter red">
              <span class="${aval ? (val < min ? 'bad' : 'good') : 'unavailable'}" style="width: 100%;"></span>
            </div>
            <div class="meter battery">
              <span class="${aval ? 'good' : 'unavailable'}" style="width:${aval ? val - 10 : '0'}%;"></span>
            </div>
          </div>
        `
      }
    }

    return html`
      <ha-card>
        <div class="header" @click="${() => cardTools.moreInfo(stateObj.entity_id)}">
          <img src="${stateObj.attributes.image}" />
          <span id="name"> ${stateObj.attributes.name} <ha-icon .icon="mdi:${stateObj.state == 'problem' ? 'alert-circle-outline' : ''}"></ha-icon></span>
          <span id="species">${species} </span>
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

  static get styles() {
    return css`
      ha-card {
        margin-top: 32px;
      }
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
      .header {
        padding-top: 8px;
        height: 72px;
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
      .header > #name {
        font-weight: bold;
        width: 100%;
        margin-top: 16px;
        text-transform: capitalize;
        display: block;
      }
      #name ha-icon {
        color: rgb(240, 163, 163);
      }
      .header > #species {
        text-transform: capitalize;
        color: #8c96a5;
        display: block;
      }
      .meter {
        height: 8px;
        background-color: #f1f1f1;
        border-radius: 2px;
        display: inline-grid;
        overflow: hidden;
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
      .meter > span {
        grid-row: 1;
        grid-column: 1;
        height: 100%;
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
  }
}

customElements.define('flower-card', FlowerCard)
