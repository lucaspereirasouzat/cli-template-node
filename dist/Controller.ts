class MyClass {
  {{#properties}}
  {{ name }}: {{ type }};
  {{/properties}}

  constructor({{#properties}}{{ name }}, {{/properties}}) {
    {{#properties}}
    this.{{ name }} = {{ name }};
    {{/properties}}
  }
}

export default {{ className }};