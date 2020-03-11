export default props => {
	if (props.currentStep !== props.step) return null
    return props.children
}