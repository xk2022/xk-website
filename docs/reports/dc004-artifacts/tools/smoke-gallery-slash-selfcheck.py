import ast
import importlib.util
from pathlib import Path

source = Path('/workspace/xk-website/scripts/smoke-website.py')
ast.parse(source.read_text())
spec = importlib.util.spec_from_file_location('smoke', source)
smoke = importlib.util.module_from_spec(spec)
spec.loader.exec_module(smoke)
heritage = '/design-collection/heritage'
for links, expected in [(['/'], ['/']), ([heritage], [heritage]), ([heritage + '/'], [heritage]), ([], [])]:
    assert smoke.gallery_style_links(links, expected) == expected
for links, expected in [([], ['/']), (['/', '/'], ['/']), (['//'], ['/']), (['/?q=1'], ['/']), (['/#hash'], ['/']), ([heritage + '//'], [heritage]), ([heritage + '/?q=1'], [heritage]), ([heritage + '#hash'], [heritage]), (['https://www.xplorekaleidoscope.com' + heritage + '/'], [heritage]), (['https://invalid.example' + heritage + '/'], [heritage]), (['/design-collection/luxury/'], [heritage]), (['/design-collection/modern/'], [heritage]), ([heritage + '/extra'], [heritage]), (['//www.xplorekaleidoscope.com' + heritage + '/'], [heritage]), (['/design-collection/luxury'], [])]:
    assert smoke.gallery_style_links(links, expected) != expected, (links, expected)
print('PASS: 4 root/Heritage/planned-empty positives and 15 count/query/hash/absolute-origin/double-slash/unknown-style/subpath/forbidden-planned-link negatives; AST syntax valid; no HTTP/server/build.')
