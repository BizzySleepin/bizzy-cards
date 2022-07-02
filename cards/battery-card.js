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
