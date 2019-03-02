
export default (client, id) => {

  const { IconsSVGs } = client.lib;

  return client.hoc({

    id,

    actions(props) {
      return {
        onClick: () => {
          if (!props.disabled) props.onclick();
        },
      };
    },

    styles: {
      div: (size, disabled, onclick, inStyle) => `
        transition: all .6s ease;
        width: ${size}px;
        height: ${size}px;
        cursor: ${onclick ? 'pointer' : 'auto'};
        opacity: ${disabled ? 0.5 : 1};
        ${inStyle}
      `,
    },

    render({ props, styles, actions }) {

      const {
        icon,
        size = 32,
        disabled = false,
        inStyle = '',
        className = '',
        onclick,
      } = props;

      if (!IconsSVGs[icon]) return false;

      return (
        <div
          class={className}
          style={styles.div(size, disabled, onclick, inStyle)}
          onclick={actions.onClick}
          __innerHTML={IconsSVGs[icon]}
        />
      );
    }

  });
};

