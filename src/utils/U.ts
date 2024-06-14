const U = {
  validEmailPattern: /^([a-z0-9_\.-]{1,})@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  validPasswordPattern:
    /^(?!((?:[A-Za-z]+)|(?:[~!@#$%^&*()_\-+=]+)|(?:[0-9]+))$)[A-Za-z\d~!@#$%^&*()_\-+=]{8,20}$/,
};

export default U;
