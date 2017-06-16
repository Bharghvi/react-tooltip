import React, { Component } from 'react'
import cn from 'classnames'
import Dom from 'app/js/utils/dom'

class Tooltip extends Component {
    state = { show: false }

    toggleTooltip = () => {
        let body = Dom.queryOne('body')
        let show = !this.state.show

        if (show) {
            if (this.props.eventOn === 'mouseover') {
                Dom.bind(this._target, 'mouseout', this.toggleTooltip)
            }
            if (this.props.cross === false) {
                Dom.bind(body, 'click', this.clickHandler)
            }
        }
        else {
            if (this.props.eventOn === 'mouseover') {
                Dom.unbind(this._target, 'mouseout', this.toggleTooltip)
            }

            if (this.props.cross === false) {
                Dom.unbind(body, 'click', this.clickHandler)
            }
        }

        this.setState({ show })
    }

    clickHandler = e => {
        let body = Dom.queryOne('body')
        let target = e.target
        if (Dom.contains(body, target)) {
            if (!Dom.contains(this._target, target)) {
                this.toggleTooltip()
            }
        }

    }

    componentDidMount () {
        if (typeof this.props.error === 'undefined') {
            Dom.bind(this._target, this.props.eventOn, this.toggleTooltip)
        }
        else {
            this.setState({ show: true })
        }
    }

    render () {
        let { cross, arrow, size, target, place, effect, type, content, eventOn, contentClass, error } = this.props

        let tooltipContainer = cn({
            tooltip__container: true,
            'tooltip__container--top': place === 'top',
            'tooltip__container--top-left': place === 'top-left',
            'tooltip__container--top-right': place === 'top-right',
            'tooltip__container--bottom': place === 'bottom',
            'tooltip__container--bottom-left': place === 'bottom-left',
            'tooltip__container--bottom-right': place === 'bottom-right',
            'tooltip__container--left': place === 'left',
            'tooltip__container--right': place === 'right',
            'tooltip--size-xsmall': size === 'xsmall',
            'tooltip--size-small': size === 'small',
            'tooltip--size-medium': size === 'medium',
            'tooltip--size-large': size === 'large',
            'tooltip--error': error === true
        })

        return (
            <div>
                <div className='tooltip_wrapper'
                    ref={ elm => { this._target = elm } } >
                    {target}
                    {this.state.show
                        ? <div className={tooltipContainer + ' tooltip'} >
                              { cross ? <i onClick={this.toggleTooltip} className='tooltip__close fl-close' /> : ''}
                              <div className={contentClass}>
                              {content}
                              </div>
                         </div>
                        : null}
                </div>
            </div>
        )
    }
}

export default Tooltip
