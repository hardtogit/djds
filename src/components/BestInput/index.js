import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
class BaseInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.defaultValue || ''
        };

        this.validateRu = this.validateRun.bind(this);
    }
    static nameq = 'BaseText';
    static propTypes = {
        className: PropTypes.string,
        defaultValue: PropTypes.string,   // 默认值
        label: PropTypes.oneOfType([      // 右侧图标
            PropTypes.string,
            PropTypes.object
        ]),          // 左侧文本
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),                                     // 中间内容
        right: PropTypes.oneOfType([      // 右侧图标
            PropTypes.bool,
            PropTypes.element,
            PropTypes.string
        ]),
        borderType: PropTypes.string,    // 边框类型
        onClick: PropTypes.func,         // 点击触发事件
        onChange: PropTypes.func,        // 值发生变化触发事件
        containerStyle: PropTypes.object,
        contentStyle: PropTypes.object
    }
    componentDidMount(){
        const {getInput}=this.props;
        if(getInput&&typeof getInput==='function'){
            getInput(this.input);
        }

    }

    validateRun() {
        return !this.state.value ? { result: false } : { result: true };
    }

    setValue(value) {
        if (value) {
            this.setState({ value });
            this.props.onChange && this.props.onChange(value);
        }
    }

    clickHandle = () => {
        this.props.onClick && this.props.onClick();
    }

    renderLeft() {
        return (
            <div className={styles.left}>
                {this.props.label && <span style={this.props.leftStyle} className={styles.leftText}>{this.props.label}</span>}
            </div>
        );
    }
    // 右侧显示内容
    renderRight() {
        const right = this.props.right;

        if ( right === false )
            return null;

        return (
            <div className={styles.right}>
                <input type={this.props.type||'text'} ref={(input)=>this.input=input} placeholder={right} />
            </div>
        );
    }

    render() {
        const props = this.props;
        const borderType = props.borderType;

        return (
            <div
                className={classNames([styles.container, borderType && styles[borderType], props.className])}
                style={this.props.containerStyle}
            >
                <div className={styles.wrap} onClick={this.clickHandle}>
                    {this.renderLeft()}
                    {this.renderRight()}
                </div>
            </div>
        );
    }
}

export default BaseInput;
