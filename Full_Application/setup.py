from setuptools import find_packages, setup
from typing import List

HYPHEN_E_DOT = '-e .'

# This function will return the list of requirements
def get_requirements(file_path: str) -> List[str]:
    requirements = []
    with open(file_path) as file_obj:
        requirements = file_obj.readlines()
        # Replacing \n with '' from requirements
        requirements = [req.replace("\n", "") for req in requirements]

        if HYPHEN_E_DOT in requirements:
            requirements.remove(HYPHEN_E_DOT)
    return requirements

setup(
    name = 'mlproject2',
    version = '0.0.1',
    author = 'Parth',
    author_email = 'parthmarathe5@gmail.com',
    packages = find_packages(),
    install_requires = get_requirements('requirements.txt'),

)