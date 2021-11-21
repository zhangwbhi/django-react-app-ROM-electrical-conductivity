# reduced-order-model-electrical-conductivity

**Built a web application with React, Django, and PostgreSQL serving the reduced order model (ROM) of electrical conductivity.**


<img src="https://github.com/zhangwbhi/django-react-app-ROM-electrical-conductivity/blob/main/images/demo.jpeg" width="600">



<br/><br/>
<br/><br/>
**Modelling pipeline**

<img src="https://github.com/zhangwbhi/django-react-app-ROM-electrical-conductivity/blob/main/images/flow_chart.png" width="800">

<br/><br/>
## Challenges:
1. **Obtaining uniformly distributed high dimensional samples while preserving the summation property.**
The samples are of 12 dimensions (E/N + mole fractions of 11 species). Since the summation of the mole fractions must equal unity, if one neutral species' mole fraction takes a large value, those of other species have to take very small value. Therefore, all neutral species' mole fractions are clustered near small values and the resulting samples barely represent the real-world scenarios. 
*A hit-and-run sampler is employed to generate high dimensional samples with improved uniformity. Moreover, domain-specific knowledge is combined with the sampler to further shrink the sampling space.*

2. **A lightweight ROM model with a balance in computational cost and accuracy.**
In 3D numerical simulations, meshes typically contain millions of nodes and elements, and the ROM model is executed for each node before every iteration. A complex ROM model could easily become the bottleneck, hindering the whole computation. Therefore, a compromise has to be made between model complexity and CPU time.
*A shallow neural network selected because of sufficient expressivity and reduced computational cost. Compared to BOLSIG+, which takes 20 hours to generate a 110k data set, the lightweight ROM model takes only seconds to compute the electrical conductivities for the whole mesh with 2 million nodes.*
