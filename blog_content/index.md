# Drew's Datascience Blog
-----------------------------------------
## Phase 1 Blog

***_Why Datascience?_***
In the last few years I have been increasingly drawn toward wanting to understand
topics in Machine-learning and computer science on a deep level. Part of that
journey has been developing an interest in the field of statistical analysis
and more recently casual inference. For a much longer period I have been very
interested in some areas of macro-economics and I have found that many of the
technical details of these subjects share their roots in statistics and mathematics.

For the past 6 or 7 years I have been working in the furniture, and commercial
fabrication industries as a metal worker and carpenter. When I decided to change
careers I intially looked to engineering and computer science given my love of
designing and making functional objects and my interest in computers. Pursuing an
advanced degree in an engineering or CS field seems to me like an over investment
of time and money at this stage of my life. My overarching desire is always to get
hands-on experience with the practical applications of a subject and a bootcamp
seemed like a great way to accomplish that goal.

Once I started looking into bootcamps I found that the data-science programs on
offer seemed to fit into my interests much more closely than most software programs.
The subject matter seemed both more technical and offered opportunities after 
graduation that fit my personality and personal passions much more closely than
a frontend focused software course. I am excited to explore the mathematic basis
behind Machine-learning and to put those concepts to use right away while learning
to utilize machine learning tools developed as part of a Python focused data-analysis
workflow.

I also am excited to deepen my comfort with and understanding of programming and look
forward to getting experience coding and developing tools to help in the process of
data-science. While I expect the program at Flatiron to be quite fast-paced I am
looking forward to getting the practical experience using the tools and techniques
of data-science, and deepening my understanding an interaction with those tools as
I move forward to pursue a new career in a related field after graduation.

## Phase 3 Blog

The during the last phase I spend a fair amount of time learning about the ast module
in the Python standard library. AST stands for 'Abstract Syntax Tree' and refers to an
abstract representation of a programming language. The ast in python is used as a step
in code parsing during the compiling process. The broad outline of the Python runtime
compilation process is:
1. code
2. abstract syntax tree
3. bit-code
4. binary program (what actually runs on the CPU)

The purpose of the abstract syntax tree is to represent the code as a nested or 'tree'
structure where the branches are objects in objects. The ast module gives programmers
access to this representation built in to python and is often used for code parsing
in static code analysis. Static code analysis is the process for trying to understand
what a program or block of code does without running it. It is used in linters (error
checkers) and LSPs (Language Server Protocols).

The ast module provides a very powerful tool for doing any type of code analysis and
manipulation. Continuing with my goals in the last blog post I started using it to
automate documentation and note taking tasks related to the canvas content. 

Before I was using regular expressions to try to find patterns and locate important
information but ASTs provide a much more direct and reliable way to identify objects
and structures within code blocks. Using ast resulted in a much more robust and useful
form of identification.

Next steps:
Use regex to format and abstract identified objects as their base form.
Use LSP to get doc-strings and signature help for each returned object.
Use a second pass with the ast module to locate examples of usage in the code base.
