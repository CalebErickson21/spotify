from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class APIModel(BaseModel):
    # Global converter from camelCase JSON API requests/responses to snake_case pydantic objects
    model_config = ConfigDict(
        alias_generator=to_camel, # Conversion specification
        populate_by_name=True, # Allow both alias name and original python field name
        from_attributes=True, # Read values from object attributes
    )
