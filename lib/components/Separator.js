
export default (client, id) => {

  return client.hoc({

    id,

    classes: {
      separator: `
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        height: 30px;
        position: relative;
      `,
      line: `
        height: 1px;
        background: hsl(0, 0%, 85%);
        width: 100%;
      `,
      text: `
        position: absolute;
        background: white;
        padding: 0 5%;
        font-style: italic;
      `,
    },

    render({ props, classes }) {

      const { text, inStyle = '' } = props;

      return (
        <div class={classes.separator} style={inStyle}>
          <div class={classes.line}></div>
          <span class={classes.text}>{text}</span>
        </div>
      );
    }

  });
};

